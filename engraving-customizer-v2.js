(function() {
  // ==============================
  // ENGRAVING CUSTOMIZER V2
  // ==============================
  // Wait for DOM ready
  function init() {
    const formRows = document.querySelectorAll('.js-parameter-custom-option');
    const actionsRow = document.querySelector('._form-row-actions');
    if (!formRows.length || !actionsRow) return;
    // Hide original form rows
    formRows.forEach(function(row) { row.style.display = 'none'; });
    // Get original form elements
    const origTextInput = document.querySelector('input[name="option[1]"]');
    const origRadios = document.querySelectorAll('input[name="option[2]"]');
    // ---- STYLES ----
    var style = document.createElement('style');
    style.id = 'ev2-styles';
    style.textContent = '' +
      '#engraving-v2{width:100%;margin:0 0 16px 0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;box-sizing:border-box}' +
      '#engraving-v2 *,#engraving-v2 *::before,#engraving-v2 *::after{box-sizing:border-box}' +
      // Toggle
      '.ev2-toggle{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:#fafaf8;border:1.5px solid #e8e6e1;border-radius:10px;cursor:pointer;transition:all .25s ease;user-select:none}' +
      '.ev2-toggle:hover{border-color:#c5c0b6;background:#f5f4f0}' +
      '.ev2-toggle.active{border-color:#8b7355;background:#faf8f4}' +
      '.ev2-toggle-left{display:flex;align-items:center;gap:12px}' +
      '.ev2-switch{position:relative;width:44px;height:24px;background:#d1cdc4;border-radius:12px;transition:background .25s ease;flex-shrink:0}' +
      '.ev2-switch::after{content:"";position:absolute;top:2px;left:2px;width:20px;height:20px;background:#fff;border-radius:50%;transition:transform .25s ease;box-shadow:0 1px 3px rgba(0,0,0,.15)}' +
      '.ev2-toggle.active .ev2-switch{background:#8b7355}' +
      '.ev2-toggle.active .ev2-switch::after{transform:translateX(20px)}' +
      '.ev2-toggle-label{display:flex;flex-direction:column;gap:2px}' +
      '.ev2-toggle-title{font-size:14px;font-weight:600;color:#2c2c2c;line-height:1.3}' +
      '.ev2-toggle-sub{font-size:12px;color:#888;line-height:1.3}' +
      '.ev2-toggle-price{font-size:13px;font-weight:600;color:#8b7355;white-space:nowrap;flex-shrink:0}' +
      // Steps container
      '.ev2-steps{overflow:hidden;max-height:0;opacity:0;transition:max-height .4s ease,opacity .3s ease,margin .3s ease;margin-top:0}' +
      '.ev2-steps.open{max-height:800px;opacity:1;margin-top:12px}' +
      // Step card
      '.ev2-step{border:1.5px solid #e8e6e1;border-radius:10px;overflow:hidden;margin-bottom:10px;transition:all .3s ease;background:#fff}' +
      '.ev2-step:last-child{margin-bottom:0}' +
      '.ev2-step-header{display:flex;align-items:center;gap:10px;padding:12px 16px;cursor:default}' +
      '.ev2-step-num{width:26px;height:26px;border-radius:50%;background:#e8e6e1;color:#999;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .25s ease}' +
      '.ev2-step.active .ev2-step-num,.ev2-step.completed .ev2-step-num{background:#8b7355;color:#fff}' +
      '.ev2-step-info{flex:1;min-width:0}' +
      '.ev2-step-title{font-size:13px;font-weight:600;color:#2c2c2c;line-height:1.3}' +
      '.ev2-step-hint{font-size:11.5px;color:#999;line-height:1.3}' +
      '.ev2-step.locked .ev2-step-header{opacity:.45}' +
      '.ev2-step.locked{border-color:#eee;background:#fcfcfc}' +
      // Step content
      '.ev2-step-content{overflow:hidden;max-height:0;opacity:0;transition:max-height .35s ease,opacity .25s ease}' +
      '.ev2-step.active .ev2-step-content{max-height:500px;opacity:1}' +
      '.ev2-step-body{padding:0 16px 14px 16px;overflow:hidden}' +
      // Text input
      '.ev2-text-input{width:100%;padding:12px 14px;border:1.5px solid #e0ddd6;border-radius:8px;font-size:14px;font-family:inherit;color:#2c2c2c;background:#fafaf8;transition:border-color .2s ease,box-shadow .2s ease;outline:none}' +
      '.ev2-text-input::placeholder{color:#bbb;font-style:italic}' +
      '.ev2-text-input:focus{border-color:#8b7355;box-shadow:0 0 0 3px rgba(139,115,85,.1);background:#fff}' +
      '.ev2-char-count{text-align:right;font-size:11px;color:#bbb;margin-top:6px;transition:color .2s ease}' +
      '.ev2-char-count.warn{color:#c0392b}' +
      // Next button
      '.ev2-next-btn{display:inline-flex;align-items:center;justify-content:center;padding:8px 20px;background:#8b7355;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;transition:background .2s ease,opacity .2s ease;margin-top:10px;font-family:inherit}' +
      '.ev2-next-btn:hover{background:#7a6348}' +
      '.ev2-next-btn:disabled{opacity:.4;cursor:not-allowed}' +
      // Font grid
      '.ev2-fonts-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;overflow:hidden}' +
      '.ev2-font-card{display:flex;align-items:center;gap:6px;padding:8px 8px;border:1.5px solid #e8e6e1;border-radius:8px;cursor:pointer;transition:all .2s ease;background:#fff;overflow:hidden;min-width:0}' +
      '.ev2-font-card:hover{border-color:#c5c0b6;background:#faf8f4}' +
      '.ev2-font-card.selected{border-color:#8b7355;background:#faf6f0;box-shadow:0 0 0 2px rgba(139,115,85,.15)}' +
      '.ev2-font-img{width:34px;height:34px;border-radius:6px;object-fit:cover;flex-shrink:0;border:1px solid #eee}' +
      '.ev2-font-info{flex:1;min-width:0}' +
      '.ev2-font-name{font-size:12px;font-weight:600;color:#2c2c2c;line-height:1.2}' +
      '.ev2-font-desc{font-size:10.5px;color:#999;line-height:1.2}' +
      '.ev2-font-check{width:18px;height:18px;min-width:18px;border-radius:50%;border:1.5px solid #ddd;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s ease}' +
      '.ev2-font-card.selected .ev2-font-check{background:#8b7355;border-color:#8b7355}' +
      '.ev2-font-check svg{width:10px;height:10px;opacity:0;transition:opacity .2s ease}' +
      '.ev2-font-card.selected .ev2-font-check svg{opacity:1}' +
      // Completed state
      '.ev2-step-done{display:none;color:#8b7355;font-size:14px;flex-shrink:0}' +
      '.ev2-step.completed .ev2-step-done{display:block}' +
      '.ev2-edit-btn{font-size:11.5px;color:#8b7355;cursor:pointer;padding:2px 8px;border-radius:4px;transition:background .2s ease;flex-shrink:0;display:none;white-space:nowrap}' +
      '.ev2-step.completed .ev2-edit-btn{display:block}' +
      '.ev2-edit-btn:hover{background:rgba(139,115,85,.1)}' +
      '.ev2-preview{font-size:12px;color:#8b7355;font-weight:500}' +
      // ---- RESPONSIVE ----
      '@media(max-width:768px){' +
        '.ev2-toggle{padding:12px 14px}' +
        '.ev2-toggle-title{font-size:13px}' +
        '.ev2-toggle-sub{font-size:11px}' +
        '.ev2-toggle-price{font-size:12px}' +
        '.ev2-fonts-grid{grid-template-columns:1fr}' +
        '.ev2-font-card{padding:10px}' +
        '.ev2-step-header{padding:10px 12px}' +
        '.ev2-step-body{padding:0 12px 12px 12px}' +
        '.ev2-text-input{font-size:16px;padding:11px 12px}' +
        '.ev2-step-title{font-size:12.5px}' +
        '.ev2-step-hint{font-size:11px}' +
      '}' +
      '@media(max-width:500px){' +
        '.ev2-toggle{flex-direction:column;align-items:stretch;padding:12px;gap:6px}' +
        '.ev2-toggle-left{display:flex;align-items:center;gap:10px}' +
        '.ev2-toggle-price{font-size:12px;text-align:right;padding-left:54px}' +
        '.ev2-toggle-title{font-size:13px}' +
        '.ev2-toggle-sub{font-size:11px}' +
        '.ev2-switch{width:40px;height:22px;flex-shrink:0}' +
        '.ev2-switch::after{width:18px;height:18px}' +
        '.ev2-toggle.active .ev2-switch::after{transform:translateX(18px)}' +
        '.ev2-step-header{padding:10px 10px;gap:8px}' +
        '.ev2-step-num{width:22px;height:22px;font-size:11px}' +
        '.ev2-step-info{flex:1;min-width:0}' +
        '.ev2-step-title{font-size:12.5px}' +
        '.ev2-step-hint{font-size:10.5px}' +
        '.ev2-edit-btn{font-size:10.5px;padding:2px 6px}' +
        '.ev2-step-done{font-size:12px}' +
        '.ev2-preview{font-size:11px}' +
        '.ev2-fonts-grid{grid-template-columns:1fr;gap:6px}' +
        '.ev2-font-card{padding:8px 10px;gap:8px}' +
        '.ev2-font-img{width:32px;height:32px}' +
        '.ev2-font-name{font-size:12.5px}' +
        '.ev2-font-desc{font-size:10.5px}' +
        '.ev2-text-input{font-size:16px;padding:10px 12px}' +
        '.ev2-step-body{padding:0 10px 12px 10px}' +
        '.ev2-next-btn{font-size:12px;padding:8px 18px}' +
        '.ev2-char-count{font-size:10px}' +
      '}' +
      '@media(max-width:340px){' +
        '.ev2-toggle-title{font-size:12px}' +
        '.ev2-toggle-sub{font-size:10px}' +
        '.ev2-toggle-price{font-size:11px}' +
        '.ev2-step-title{font-size:12px}' +
      '}';
    document.head.appendChild(style);
    // ---- HTML ----
    var checkSvg = '<svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var container = document.createElement('div');
    container.id = 'engraving-v2';
    container.innerHTML =
      '<div class="ev2-toggle" id="ev2-toggle">' +
        '<div class="ev2-toggle-left">' +
          '<div class="ev2-switch"></div>' +
          '<div class="ev2-toggle-label">' +
            '<span class="ev2-toggle-title">\u0416\u0435\u043B\u0430\u044F \u0433\u0440\u0430\u0432\u0438\u0440\u0430\u043D\u0435</span>' +
            '<span class="ev2-toggle-sub">\u0414\u043E\u0431\u0430\u0432\u0435\u0442\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u043D\u043E \u043F\u043E\u0441\u043B\u0430\u043D\u0438\u0435</span>' +
          '</div>' +
        '</div>' +
        '<span class="ev2-toggle-price">+5,00 \u20AC / 9,78 \u043B\u0432.</span>' +
      '</div>' +
      '<div class="ev2-steps" id="ev2-steps">' +
        // Step 1
        '<div class="ev2-step active" id="ev2-step-1">' +
          '<div class="ev2-step-header">' +
            '<div class="ev2-step-num">1</div>' +
            '<div class="ev2-step-info">' +
              '<div class="ev2-step-title">\u0412\u0430\u0448\u0435\u0442\u043E \u043F\u043E\u0441\u043B\u0430\u043D\u0438\u0435</div>' +
              '<div class="ev2-step-hint" id="ev2-hint-1">\u041D\u0430\u043F\u0438\u0448\u0435\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\u0430 \u0437\u0430 \u0433\u0440\u0430\u0432\u0438\u0440\u0430\u043D\u0435</div>' +
            '</div>' +
            '<span class="ev2-step-done">\u2713</span>' +
            '<span class="ev2-edit-btn" id="ev2-edit-1">\u041F\u0440\u043E\u043C\u0435\u043D\u0438</span>' +
          '</div>' +
          '<div class="ev2-step-content">' +
            '<div class="ev2-step-body">' +
              '<input type="text" class="ev2-text-input" id="ev2-text-input" placeholder="\u041D\u0430\u043F\u0440. \u0421 \u043B\u044E\u0431\u043E\u0432 \u0437\u0430 \u0442\u0435\u0431..." maxlength="50" autocomplete="off" />' +
              '<div class="ev2-char-count"><span id="ev2-char-current">0</span> / 50 \u0441\u0438\u043C\u0432\u043E\u043B\u0430</div>' +
              '<button type="button" class="ev2-next-btn" id="ev2-next-btn" disabled>\u041D\u0430\u043F\u0440\u0435\u0434</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        // Step 2
        '<div class="ev2-step locked" id="ev2-step-2">' +
          '<div class="ev2-step-header">' +
            '<div class="ev2-step-num">2</div>' +
            '<div class="ev2-step-info">' +
              '<div class="ev2-step-title">\u0418\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0448\u0440\u0438\u0444\u0442</div>' +
              '<div class="ev2-step-hint" id="ev2-hint-2">\u0418\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0441\u0442\u0438\u043B\u0430 \u043D\u0430 \u0433\u0440\u0430\u0432\u0438\u0440\u0430\u043D\u0438\u044F \u0442\u0435\u043A\u0441\u0442</div>' +
            '</div>' +
            '<span class="ev2-step-done">\u2713</span>' +
            '<span class="ev2-edit-btn" id="ev2-edit-2">\u041F\u0440\u043E\u043C\u0435\u043D\u0438</span>' +
          '</div>' +
          '<div class="ev2-step-content">' +
            '<div class="ev2-step-body">' +
              '<div class="ev2-fonts-grid" id="ev2-fonts-grid">' +
                '<div class="ev2-font-card" data-font="1"><img class="ev2-font-img" src="https://cdncloudcart.com/64767/form_field_options_option/images/1/letov_150x150.jpeg?1771519179" alt="Letov"/><div class="ev2-font-info"><div class="ev2-font-name">Letov</div><div class="ev2-font-desc">\u041A\u043B\u0430\u0441\u0438\u0447\u0435\u0441\u043A\u0438 \u0441\u0442\u0438\u043B</div></div><div class="ev2-font-check">' + checkSvg + '</div></div>' +
                '<div class="ev2-font-card" data-font="2"><img class="ev2-font-img" src="https://cdncloudcart.com/64767/form_field_options_option/images/2/lobster_150x150.jpeg?1771519179" alt="Lobster"/><div class="ev2-font-info"><div class="ev2-font-name">Lobster</div><div class="ev2-font-desc">\u0415\u043B\u0435\u0433\u0430\u043D\u0442\u0435\u043D \u0440\u044A\u043A\u043E\u043F\u0438\u0441\u0435\u043D</div></div><div class="ev2-font-check">' + checkSvg + '</div></div>' +
                '<div class="ev2-font-card" data-font="3"><img class="ev2-font-img" src="https://cdncloudcart.com/64767/form_field_options_option/images/3/monotype-corsiva_150x150.jpeg?1771519179" alt="Monotype Corsiva"/><div class="ev2-font-info"><div class="ev2-font-name">Monotype Corsiva</div><div class="ev2-font-desc">\u0418\u0437\u0438\u0441\u043A\u0430\u043D \u043A\u0443\u0440\u0441\u0438\u0432</div></div><div class="ev2-font-check">' + checkSvg + '</div></div>' +
                '<div class="ev2-font-card" data-font="4"><img class="ev2-font-img" src="https://cdncloudcart.com/64767/form_field_options_option/images/4/vetrino_150x150.jpeg?1771519179" alt="Vetrino"/><div class="ev2-font-info"><div class="ev2-font-name">Vetrino</div><div class="ev2-font-desc">\u041C\u043E\u0434\u0435\u0440\u0435\u043D \u0448\u0440\u0438\u0444\u0442</div></div><div class="ev2-font-check">' + checkSvg + '</div></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    actionsRow.parentElement.insertBefore(container, actionsRow);
    // ---- LOGIC ----
    var toggle = document.getElementById('ev2-toggle');
    var steps = document.getElementById('ev2-steps');
    var step1 = document.getElementById('ev2-step-1');
    var step2 = document.getElementById('ev2-step-2');
    var textInput = document.getElementById('ev2-text-input');
    var charCurrent = document.getElementById('ev2-char-current');
    var fontsGrid = document.getElementById('ev2-fonts-grid');
    var editStep1 = document.getElementById('ev2-edit-1');
    var editStep2 = document.getElementById('ev2-edit-2');
    var nextBtn = document.getElementById('ev2-next-btn');
    var hint1 = document.getElementById('ev2-hint-1');
    var hint2 = document.getElementById('ev2-hint-2');
    var isActive = false;
    var selectedFont = null;
    var textValue = '';
    // Prevent Enter from submitting form
    textInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        if (textValue.trim().length > 0) {
          completeStep1();
          goToStep(2);
        }
        return false;
      }
    });
    // Toggle on/off
    toggle.addEventListener('click', function() {
      isActive = !isActive;
      toggle.classList.toggle('active', isActive);
      steps.classList.toggle('open', isActive);
      if (!isActive) resetAll();
    });
    // Text input handler
    textInput.addEventListener('input', function() {
      textValue = this.value;
      charCurrent.textContent = textValue.length;
      var charCount = this.closest('.ev2-step-body').querySelector('.ev2-char-count');
      charCount.classList.toggle('warn', textValue.length >= 45);
      if (origTextInput) {
        origTextInput.value = textValue;
        origTextInput.dispatchEvent(new Event('input', { bubbles: true }));
        origTextInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
      nextBtn.disabled = textValue.trim().length === 0;
    });
    // Next button
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (textValue.trim().length > 0) {
        completeStep1();
        goToStep(2);
      }
    });
    // Font selection
    fontsGrid.addEventListener('click', function(e) {
      var card = e.target.closest('.ev2-font-card');
      if (!card) return;
      fontsGrid.querySelectorAll('.ev2-font-card').forEach(function(c) { c.classList.remove('selected'); });
      card.classList.add('selected');
      selectedFont = card.dataset.font;
      origRadios.forEach(function(r) {
        if (r.value === selectedFont) {
          r.checked = true;
          r.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      completeStep2();
    });
    // Edit buttons
    editStep1.addEventListener('click', function(e) {
      e.stopPropagation();
      step1.className = 'ev2-step active';
      step2.className = 'ev2-step locked';
      hint1.textContent = '\u041D\u0430\u043F\u0438\u0448\u0435\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\u0430 \u0437\u0430 \u0433\u0440\u0430\u0432\u0438\u0440\u0430\u043D\u0435';
      hint2.textContent = '\u0418\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0441\u0442\u0438\u043B\u0430 \u043D\u0430 \u0433\u0440\u0430\u0432\u0438\u0440\u0430\u043D\u0438\u044F \u0442\u0435\u043A\u0441\u0442';
      fontsGrid.querySelectorAll('.ev2-font-card').forEach(function(c) { c.classList.remove('selected'); });
      selectedFont = null;
      origRadios.forEach(function(r) { r.checked = false; });
      nextBtn.disabled = textValue.trim().length === 0;
      setTimeout(function() { textInput.focus(); }, 100);
    });
    editStep2.addEventListener('click', function(e) {
      e.stopPropagation();
      step2.className = 'ev2-step active';
      hint2.textContent = '\u0418\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0441\u0442\u0438\u043B\u0430 \u043D\u0430 \u0433\u0440\u0430\u0432\u0438\u0440\u0430\u043D\u0438\u044F \u0442\u0435\u043A\u0441\u0442';
    });
    function goToStep(num) {
      if (num === 1) {
        step1.classList.add('active');
        step1.classList.remove('locked');
        step2.classList.remove('active');
        setTimeout(function() { textInput.focus(); }, 100);
      } else if (num === 2) {
        step1.classList.remove('active');
        step2.classList.add('active');
        step2.classList.remove('locked');
      }
    }
    function completeStep1() {
      step1.classList.add('completed');
      step1.classList.remove('active');
      var safe = textValue.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
      hint1.innerHTML = '<span class="ev2-preview">\u201C' + safe + '\u201D</span>';
    }
    function completeStep2() {
      step2.classList.add('completed');
      step2.classList.remove('active');
      var fontCard = fontsGrid.querySelector('.ev2-font-card.selected');
      var fontName = fontCard ? fontCard.querySelector('.ev2-font-name').textContent : '';
      hint2.innerHTML = '<span class="ev2-preview">' + fontName + '</span>';
    }
    function resetAll() {
      textValue = '';
      selectedFont = null;
      textInput.value = '';
      charCurrent.textContent = '0';
      step1.className = 'ev2-step active';
      step2.className = 'ev2-step locked';
      hint1.textContent = '\u041D\u0430\u043F\u0438\u0448\u0435\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\u0430 \u0437\u0430 \u0433\u0440\u0430\u0432\u0438\u0440\u0430\u043D\u0435';
      hint2.textContent = '\u0418\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0441\u0442\u0438\u043B\u0430 \u043D\u0430 \u0433\u0440\u0430\u0432\u0438\u0440\u0430\u043D\u0438\u044F \u0442\u0435\u043A\u0441\u0442';
      fontsGrid.querySelectorAll('.ev2-font-card').forEach(function(c) { c.classList.remove('selected'); });
      nextBtn.disabled = true;
      if (origTextInput) origTextInput.value = '';
      origRadios.forEach(function(r) { r.checked = false; });
    }
  }
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
