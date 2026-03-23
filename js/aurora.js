/**
 * Aurora — AI Chat Assistant + Assessment Engine
 * Modes: MENTOR (chat with profile data) | ASSESSMENT (guided questionnaire)
 * Story 2.1 — SPEC-GZD-002
 */
var Aurora = (function() {
  'use strict';

  var LS_DATA_BASE = 'psicometria_data_v2';
  var LS_SRC_BASE = 'psicometria_source_v2';
  var messages = [];
  var isSending = false;
  var isOpen = false;

  // Assessment state
  var assessmentData = null; // loaded from JSON
  var assessmentState = null; // { phase, sectionIdx, questionIdx, answers, anchors, additional }
  var assessmentSlug = null;

  function _uid() {
    if (typeof ClientLoader !== 'undefined' && ClientLoader.isClientRoute()) {
      return ClientLoader.getUserId(ClientLoader.getSlug());
    }
    var user = typeof Auth !== 'undefined' && Auth.getUser ? Auth.getUser() : null;
    return user ? user.id : null;
  }

  function getProfileData() {
    var id = _uid();
    var key = id ? LS_DATA_BASE + '_' + id : null;
    if (!key) return null;
    try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; }
  }

  // ── ASSESSMENT STORAGE ──

  function _assessKey(suffix) {
    return suffix + '_' + (assessmentSlug || 'unknown');
  }

  function saveAssessmentProgress() {
    if (!assessmentState) return;
    try { localStorage.setItem(_assessKey('assessment_progress'), JSON.stringify(assessmentState)); } catch(e) {}
  }

  function loadAssessmentProgress() {
    try {
      var saved = localStorage.getItem(_assessKey('assessment_progress'));
      return saved ? JSON.parse(saved) : null;
    } catch(e) { return null; }
  }

  function clearAssessmentProgress() {
    localStorage.removeItem(_assessKey('assessment_progress'));
  }

  // ── INIT ──

  function init() {
    if (document.getElementById('aurora-fab')) return;
    var data = getProfileData();
    if (!data || !data.profile) return;
    renderFab();
  }

  function initAssessment(slug) {
    assessmentSlug = slug;
    renderFab();
    // Auto-open panel and start assessment
    setTimeout(function() {
      if (!isOpen) toggle();
      loadAssessmentData(function() {
        var saved = loadAssessmentProgress();
        if (saved && saved.phase !== 'complete') {
          assessmentState = saved;
          addMessage('assistant', 'Bem-vindo de volta! Você parou na **' + getCurrentProgressText() + '**. Vamos continuar?');
          resumeAssessment();
        } else {
          assessmentState = { phase: 'welcome', sectionIdx: 0, questionIdx: 0, answers: {}, anchors: {}, additional: '' };
          showWelcome();
        }
      });
    }, 500);
  }

  function loadAssessmentData(cb) {
    if (assessmentData) { cb(); return; }
    fetch('/data/assessment-questions.json')
      .then(function(r) { return r.json(); })
      .then(function(data) { assessmentData = data; cb(); })
      .catch(function() {
        addMessage('assistant', 'Erro ao carregar o questionário. Tente recarregar a página.');
      });
  }

  // ── ASSESSMENT FLOW ──

  function showWelcome() {
    var name = assessmentSlug ? assessmentSlug.replace(/-/g, ' ') : '';
    addMessage('assistant',
      'Olá! Sou a **Aurora**, sua guia de autoconhecimento. ✨\n\n' +
      'Vou conduzir um assessment de **~30 minutos** para mapear sua **Zona de Genialidade** através de 7 frameworks científicos.\n\n' +
      'São 5 seções com 43 perguntas no total. Seu progresso é salvo automaticamente — se precisar pausar, pode voltar depois.\n\n' +
      'Antes de começar, quero saber: **você já tem resultados de outros testes de autoconhecimento?** (Eneagrama, DISC, MBTI, etc.)\n\n' +
      '1. Sim, tenho alguns resultados\n2. Não, vamos direto ao assessment'
    );
    assessmentState.phase = 'anchor_ask';
    saveAssessmentProgress();
    setInputHandler(handleAssessmentInput);
  }

  function handleAssessmentInput() {
    var input = document.getElementById('aurora-input');
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMessage('user', text);

    var phase = assessmentState.phase;

    if (phase === 'anchor_ask') {
      if (text === '1' || /sim/i.test(text)) {
        assessmentState.phase = 'anchor_collect';
        assessmentState._anchorIdx = 0;
        saveAssessmentProgress();
        askNextAnchor();
      } else {
        assessmentState.phase = 'open_field';
        saveAssessmentProgress();
        askOpenField();
      }
    } else if (phase === 'anchor_collect') {
      collectAnchorResponse(text);
    } else if (phase === 'open_field') {
      collectOpenField(text);
    } else if (phase === 'questions') {
      collectQuestionResponse(text);
    }
  }

  // ── ANCHORS ──

  function askNextAnchor() {
    var idx = assessmentState._anchorIdx || 0;
    var anchors = assessmentData.anchors.known;
    if (idx >= anchors.length) {
      assessmentState.phase = 'open_field';
      saveAssessmentProgress();
      askOpenField();
      return;
    }
    var a = anchors[idx];
    addMessage('assistant',
      '**' + a.label + '**\n' + a.question + '\n\n_' + a.placeholder + '_\n\nDigite seu resultado ou **pular** para a próxima.'
    );
  }

  function collectAnchorResponse(text) {
    var idx = assessmentState._anchorIdx || 0;
    var anchors = assessmentData.anchors.known;
    var a = anchors[idx];

    if (!/^pular$/i.test(text) && text.length > 0) {
      assessmentState.anchors[a.id] = text;
    }

    assessmentState._anchorIdx = idx + 1;
    saveAssessmentProgress();
    askNextAnchor();
  }

  // ── OPEN FIELD ──

  function askOpenField() {
    addMessage('assistant',
      assessmentData.anchors.openField.question + '\n\n_Pode colar resultados, contar experiências, ou digitar **pular** para seguir direto._'
    );
  }

  function collectOpenField(text) {
    if (!/^pular$/i.test(text) && !/^n[aã]o$/i.test(text)) {
      assessmentState.additional = text.slice(0, 5000);
    }
    assessmentState.phase = 'questions';
    assessmentState.sectionIdx = 0;
    assessmentState.questionIdx = 0;
    saveAssessmentProgress();
    showSectionIntro();
  }

  // ── QUESTIONS ──

  function showSectionIntro() {
    var sec = assessmentData.sections[assessmentState.sectionIdx];
    var totalSections = assessmentData.sections.length;
    addMessage('assistant',
      '**Seção ' + (assessmentState.sectionIdx + 1) + ' de ' + totalSections + ' — ' + sec.title + '** (' + sec.duration + ')\n\n' + sec.intro
    );
    setTimeout(function() { askCurrentQuestion(); }, 800);
  }

  function askCurrentQuestion() {
    var sec = assessmentData.sections[assessmentState.sectionIdx];
    var q = sec.questions[assessmentState.questionIdx];
    var totalQ = sec.questions.length;
    var progress = '_Seção ' + (assessmentState.sectionIdx + 1) + '/5 · Pergunta ' + (assessmentState.questionIdx + 1) + '/' + totalQ + '_';

    var msg = progress + '\n\n**' + q.text + '**';

    if (q.type === 'choice' || q.type === 'multi') {
      msg += '\n';
      for (var i = 0; i < q.options.length; i++) {
        msg += '\n' + (i + 1) + '. ' + q.options[i];
      }
      if (q.type === 'multi') {
        msg += '\n\n_Pode escolher várias: digite os números separados por vírgula (ex: 1, 3, 5)_';
      }
    }

    if (q.hint) {
      msg += '\n\n_💡 ' + q.hint + '_';
    }

    addMessage('assistant', msg);
  }

  function collectQuestionResponse(text) {
    var sec = assessmentData.sections[assessmentState.sectionIdx];
    var q = sec.questions[assessmentState.questionIdx];

    // Parse response
    var answer;
    if (q.type === 'choice') {
      var num = parseInt(text, 10);
      if (num >= 1 && num <= q.options.length) {
        answer = q.options[num - 1];
      } else {
        // Try text match
        answer = text;
      }
    } else if (q.type === 'multi') {
      var parts = text.split(/[,;\s]+/);
      var selected = [];
      for (var i = 0; i < parts.length; i++) {
        var n = parseInt(parts[i], 10);
        if (n >= 1 && n <= q.options.length) {
          selected.push(q.options[n - 1]);
        }
      }
      answer = selected.length > 0 ? selected : [text];
    } else {
      answer = text;
    }

    assessmentState.answers[q.id] = answer;

    // Advance to next question
    assessmentState.questionIdx++;

    if (assessmentState.questionIdx >= sec.questions.length) {
      // Section complete
      assessmentState.questionIdx = 0;
      assessmentState.sectionIdx++;
      saveAssessmentProgress();

      if (assessmentState.sectionIdx >= assessmentData.sections.length) {
        // Assessment complete!
        assessmentState.phase = 'complete';
        saveAssessmentProgress();
        onAssessmentComplete();
        return;
      }

      addMessage('assistant', '✅ Seção concluída! Vamos para a próxima...');
      setTimeout(function() { showSectionIntro(); }, 600);
    } else {
      saveAssessmentProgress();
      askCurrentQuestion();
    }
  }

  // ── ASSESSMENT COMPLETE ──

  function onAssessmentComplete() {
    addMessage('assistant',
      '🎉 **Assessment concluído!**\n\n' +
      'Agora vou analisar suas respostas nos **7 frameworks** científicos. ' +
      'Isso leva de **3 a 5 minutos** — estou cruzando seus dados com Gay Hendricks, CliftonStrengths, Kolbe, Hormozi, Hamilton, Hogshead e Sullivan.\n\n' +
      '_Aguarde..._'
    );

    // Compile and send to /api/analyze
    var compiledText = compileAssessmentText();

    var fetchHeaders = { 'Content-Type': 'application/json' };
    var authH = typeof Auth !== 'undefined' && Auth.authHeaders ? Auth.authHeaders() : {};
    if (authH.Authorization) fetchHeaders.Authorization = authH.Authorization;

    showTyping();

    fetch('/api/analyze', {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({ text: compiledText, fileName: 'assessment-' + (assessmentSlug || 'user') + '.md' })
    })
    .then(function(r) {
      if (!r.ok) return r.json().then(function(e) { throw new Error(e.error || 'Erro ' + r.status); });
      return r.json();
    })
    .then(function(data) {
      hideTyping();
      // Save profile
      var uid = _uid();
      var dataKey = uid ? LS_DATA_BASE + '_' + uid : null;
      if (dataKey) localStorage.setItem(dataKey, JSON.stringify(data));

      // Save source text
      var srcKey = uid ? LS_SRC_BASE + '_' + uid : null;
      if (srcKey) try { localStorage.setItem(srcKey, compiledText.slice(0, 100000)); } catch(e) {}

      // Cleanup assessment progress
      clearAssessmentProgress();

      // Render dashboard
      if (typeof PsicoRenderer !== 'undefined') PsicoRenderer.render(data);

      // Transition to mentor mode
      var firstName = (data.profile && data.profile.name) ? data.profile.name.split(' ')[0] : 'amigo';
      addMessage('assistant',
        '✨ **Seu Mapa de Genialidade está pronto, ' + firstName + '!**\n\n' +
        'O dashboard acima mostra seu perfil completo nos 7 frameworks. ' +
        'Agora sou sua **mentora pessoal** — me pergunte qualquer coisa sobre seu perfil, talentos, zonas, ou como aplicar esses insights no seu dia a dia!'
      );

      // Switch to mentor mode
      setInputHandler(null); // restore default chat handler
      assessmentState = null;
    })
    .catch(function(err) {
      hideTyping();
      addMessage('assistant',
        '❌ Houve um erro na análise: ' + esc(err.message) + '\n\n' +
        'Suas respostas estão salvas. Digite **tentar novamente** para reprocessar.'
      );
      // Keep assessment handler to catch retry
      setInputHandler(function() {
        var input = document.getElementById('aurora-input');
        var text = input.value.trim();
        if (!text) return;
        input.value = '';
        addMessage('user', text);
        if (/tentar|retry|novamente/i.test(text)) {
          onAssessmentComplete();
        }
      });
    });
  }

  function compileAssessmentText() {
    var st = assessmentState;
    var lines = [];
    lines.push('# Assessment Zona de Genialidade');
    lines.push('');

    // Anchors
    var hasAnchors = Object.keys(st.anchors).length > 0;
    if (hasAnchors || st.additional) {
      lines.push('## Âncoras de Calibração');
      var anchorLabels = {};
      if (assessmentData && assessmentData.anchors) {
        assessmentData.anchors.known.forEach(function(a) { anchorLabels[a.id] = a.label; });
      }
      for (var key in st.anchors) {
        var label = anchorLabels[key] || key;
        lines.push('- ' + label + ': ' + st.anchors[key]);
      }
      if (st.additional) {
        lines.push('');
        lines.push('### Dados Adicionais');
        lines.push(st.additional);
      }
      lines.push('');
    }

    // Questions by section
    if (assessmentData && assessmentData.sections) {
      assessmentData.sections.forEach(function(sec) {
        lines.push('## ' + sec.title);
        sec.questions.forEach(function(q) {
          var ans = st.answers[q.id];
          if (ans !== undefined && ans !== null) {
            var ansStr = Array.isArray(ans) ? ans.join(', ') : String(ans);
            lines.push(q.id + ' (' + q.text + '): ' + ansStr);
          }
        });
        lines.push('');
      });
    }

    return lines.join('\n');
  }

  // ── RESUME ──

  function resumeAssessment() {
    var phase = assessmentState.phase;
    if (phase === 'anchor_ask') {
      showWelcome();
    } else if (phase === 'anchor_collect') {
      askNextAnchor();
    } else if (phase === 'open_field') {
      askOpenField();
    } else if (phase === 'questions') {
      askCurrentQuestion();
    } else if (phase === 'complete') {
      onAssessmentComplete();
    }
  }

  function getCurrentProgressText() {
    if (!assessmentState) return '';
    var phase = assessmentState.phase;
    if (phase === 'anchor_ask' || phase === 'anchor_collect') return 'Âncoras de Calibração';
    if (phase === 'open_field') return 'Dados Complementares';
    if (phase === 'questions' && assessmentData) {
      var sec = assessmentData.sections[assessmentState.sectionIdx];
      return 'Seção ' + (assessmentState.sectionIdx + 1) + ' — ' + (sec ? sec.title : '');
    }
    return 'Assessment';
  }

  // ── INPUT HANDLER SWITCH ──

  var _customInputHandler = null;

  function setInputHandler(handler) {
    _customInputHandler = handler;
  }

  function handleSend() {
    if (_customInputHandler) {
      _customInputHandler();
      return;
    }
    if (isSending) return;
    var input = document.getElementById('aurora-input');
    var text = input.value.trim();
    if (!text) return;

    input.value = '';
    addMessage('user', text);
    messages.push({ role: 'user', content: text });
    isSending = true;
    showTyping();

    var fetchHeaders = { 'Content-Type': 'application/json' };
    var authH = typeof Auth !== 'undefined' && Auth.authHeaders ? Auth.authHeaders() : {};
    if (authH.Authorization) fetchHeaders.Authorization = authH.Authorization;

    fetch('/api/aurora', {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({
        messages: messages,
        profileData: getProfileData(),
        originalText: (function() { var id = _uid(); var k = id ? LS_SRC_BASE + '_' + id : null; return k ? (localStorage.getItem(k) || '') : ''; })().slice(0, 50000)
      })
    })
    .then(function(r) {
      if (r.status === 429) {
        return r.json().then(function(data) {
          var resetDate = data.quota && data.quota.resetAt ? new Date(data.quota.resetAt) : null;
          var resetStr = resetDate ? resetDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'em breve';
          throw new Error('Voc\u00ea atingiu o limite de ' + (data.quota ? data.quota.limit : 20) + ' mensagens por dia. Volte amanh\u00e3 \u00e0s ' + resetStr + '.');
        });
      }
      if (!r.ok) return r.json().then(function(e) { throw new Error(e.error || 'Erro'); });
      return r.json();
    })
    .then(function(data) {
      hideTyping();
      isSending = false;
      messages.push({ role: 'assistant', content: data.response });
      addMessage('assistant', data.response);
    })
    .catch(function(err) {
      hideTyping();
      isSending = false;
      addMessage('assistant', err.message || 'Desculpe, tive um problema ao processar. Tente novamente.');
    });
  }

  // ── UI RENDERING ──

  function renderFab() {
    if (document.getElementById('aurora-fab')) return;
    var fab = document.createElement('button');
    fab.className = 'aurora-fab';
    fab.id = 'aurora-fab';
    fab.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    fab.setAttribute('aria-label', 'Abrir Aurora');
    fab.addEventListener('click', toggle);
    document.body.appendChild(fab);
  }

  function renderPanel() {
    if (document.getElementById('aurora-panel')) return;
    var data = getProfileData();
    var profile = (data && data.profile) ? data.profile : {};
    var firstName = (profile.name || 'aluno').split(' ')[0];
    var isAssessMode = assessmentState && assessmentState.phase !== 'complete';

    var panel = document.createElement('div');
    panel.className = 'aurora-panel';
    panel.id = 'aurora-panel';
    panel.innerHTML =
      '<div class="aurora-panel__header">' +
        '<div class="aurora-panel__title">' +
          '<div class="aurora-panel__avatar">\u2726</div>' +
          '<div><div class="aurora-panel__name">Aurora</div>' +
          '<div class="aurora-panel__status">' + (isAssessMode ? 'Assessment de Genialidade' : 'Sua mentora pessoal') + '</div></div>' +
        '</div>' +
        '<button class="aurora-panel__close" id="aurora-close">\u00d7</button>' +
      '</div>' +
      '<div class="aurora-panel__messages" id="aurora-messages">' +
        (isAssessMode ? '' :
        '<div class="aurora-msg aurora-msg--assistant">' +
          '<div class="aurora-msg__content"><p>Ola, ' + esc(firstName) + '! Sou a <strong>Aurora</strong>, sua mentora pessoal de autoconhecimento. Conheco todo o seu perfil psicometrico — seus talentos, zonas, instintos e potenciais. Me pergunte qualquer coisa!</p></div>' +
        '</div>') +
      '</div>' +
      '<div class="aurora-panel__input-wrap">' +
        '<input type="text" class="aurora-panel__input" id="aurora-input" placeholder="' + (isAssessMode ? 'Digite sua resposta...' : 'Pergunte sobre seu perfil...') + '" autocomplete="off">' +
        '<button class="aurora-panel__send" id="aurora-send">' +
          '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
        '</button>' +
      '</div>';

    document.body.appendChild(panel);
    document.getElementById('aurora-close').addEventListener('click', toggle);
    document.getElementById('aurora-send').addEventListener('click', handleSend);
    document.getElementById('aurora-input').addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    });
  }

  function toggle() {
    isOpen = !isOpen;
    var fab = document.getElementById('aurora-fab');
    if (isOpen) {
      renderPanel();
      document.getElementById('aurora-panel').classList.add('aurora-panel--open');
      fab.classList.add('aurora-fab--hidden');
      setTimeout(function() { document.getElementById('aurora-input').focus(); }, 300);
    } else {
      var panel = document.getElementById('aurora-panel');
      if (panel) panel.classList.remove('aurora-panel--open');
      fab.classList.remove('aurora-fab--hidden');
    }
  }

  function addMessage(role, text) {
    var container = document.getElementById('aurora-messages');
    if (!container) return;
    var div = document.createElement('div');
    div.className = 'aurora-msg aurora-msg--' + role;
    div.innerHTML = '<div class="aurora-msg__content">' + formatText(text) + '</div>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function showTyping() {
    var container = document.getElementById('aurora-messages');
    if (!container) return;
    var div = document.createElement('div');
    div.className = 'aurora-msg aurora-msg--assistant';
    div.id = 'aurora-typing';
    div.innerHTML = '<div class="aurora-msg__content"><span class="aurora-typing"><span></span><span></span><span></span></span></div>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById('aurora-typing');
    if (el) el.remove();
  }

  function formatText(text) {
    var safe = esc(text);
    safe = safe.replace(/&lt;strong&gt;/g, '<strong>').replace(/&lt;\/strong&gt;/g, '</strong>');
    safe = safe.replace(/&lt;em&gt;/g, '<em>').replace(/&lt;\/em&gt;/g, '</em>');

    var lines = safe.split('\n');
    var html = '';
    var inList = false;
    var lt = '';
    var inTable = false;
    var tableHeaderDone = false;

    for (var i = 0; i < lines.length; i++) {
      var t = lines[i].trim();
      if (!t) { closeList(); closeTable(); continue; }
      if (/^[-_*]{3,}$/.test(t) && !inTable) { closeList(); html += '<hr class="aurora-hr">'; continue; }
      if (/^\|(.+)\|$/.test(t)) {
        closeList();
        if (/^\|[\s\-:|]+\|$/.test(t)) { tableHeaderDone = true; continue; }
        var cells = t.slice(1, -1).split('|');
        if (!inTable) {
          html += '<table class="aurora-table"><thead><tr>';
          for (var c = 0; c < cells.length; c++) html += '<th>' + inl(cells[c].trim()) + '</th>';
          html += '</tr></thead><tbody>';
          inTable = true; tableHeaderDone = false; continue;
        }
        html += '<tr>';
        for (var c2 = 0; c2 < cells.length; c2++) html += '<td>' + inl(cells[c2].trim()) + '</td>';
        html += '</tr>'; continue;
      }
      closeTable();
      if (/^### /.test(t)) { closeList(); html += '<h6 class="aurora-md-h">' + inl(t.slice(4)) + '</h6>'; continue; }
      if (/^## /.test(t))  { closeList(); html += '<h5 class="aurora-md-h">' + inl(t.slice(3)) + '</h5>'; continue; }
      if (/^# /.test(t))   { closeList(); html += '<h4 class="aurora-md-h">' + inl(t.slice(2)) + '</h4>'; continue; }
      if (/^[-*] /.test(t)) { openList('ul'); html += '<li>' + inl(t.slice(2)) + '</li>'; continue; }
      if (/^\d+\.\s/.test(t)) { openList('ol'); html += '<li>' + inl(t.replace(/^\d+\.\s*/, '')) + '</li>'; continue; }
      closeList();
      html += '<p>' + inl(t) + '</p>';
    }
    closeList(); closeTable();
    return html;

    function closeList() { if (inList) { html += '</' + lt + '>'; inList = false; } }
    function openList(type) {
      if (!inList || lt !== type) { closeList(); html += '<' + type + '>'; inList = true; lt = type; }
    }
    function closeTable() { if (inTable) { html += '</tbody></table>'; inTable = false; tableHeaderDone = false; } }
  }

  function inl(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="aurora-code">$1</code>');
  }

  function esc(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  return { init: init, initAssessment: initAssessment };
})();
