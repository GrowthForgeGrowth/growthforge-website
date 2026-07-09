(function () {

  var quickActions = [
    { label: 'AI SEO / GEO', query: 'Tell me about AI SEO and GEO' },
    { label: 'Google Ads', query: 'How can GrowthForge help with Google Ads?' },
    { label: 'Meta Ads', query: 'Tell me about Meta Ads support' },
    { label: 'CRO', query: 'How do you approach CRO?' },
    { label: 'Marketing Automation & AI', query: 'What do you do for marketing automation and AI?' },
    { label: 'Executive Consulting', query: 'What is executive consulting?' },
    { label: 'Pricing / Growth Audit', query: 'What are pricing options and growth audit details?' },
    { label: 'Book Discovery Session', query: 'How do I book a discovery session?' },
    { label: 'Contact & Response Time', query: 'How can I contact you and how fast do you respond?' }
  ];

  var fallbackAnswer = {
    text: 'I can help with AI SEO/GEO, paid media, CRO, automation, consulting, pricing, and next steps. For the quickest path, choose one of these:',
    links: [
      { href: '/discovery', label: 'Book Discovery' },
      { href: '/pricing', label: 'View Pricing' },
      { href: '/contact', label: 'Contact GrowthForge' }
    ]
  };

  var welcomeMessage = 'Hi! I\'m your GrowthForge assistant. I can help with AI SEO/GEO, Google Ads, Meta Ads, CRO, automation, consulting, pricing, and booking a discovery session.';
  var minAutoScrollThreshold = 24;
  var autoScrollThresholdRatio = 0.08;
  var intents = [
    {
      keywords: ['ai seo', 'geo', 'generative engine optimization', 'ai visibility', 'ai search'],
      answer: {
        text: 'GrowthForge helps brands win modern search with AI SEO + GEO: entity clarity, technical SEO, citation-ready content, and authority systems that improve visibility in both Google and AI assistants.',
        links: [{ href: '/ai-seo-for-b2b-saas', label: 'See AI SEO details' }]
      }
    },
    {
      keywords: ['google ads', 'ppc', 'paid search', 'search ads'],
      answer: {
        text: 'For Google Ads, GrowthForge focuses on strategy, campaign architecture, conversion quality, and efficiency so spend turns into qualified pipeline instead of vanity clicks.',
        links: [{ href: '/pricing', label: 'View partnership options' }]
      }
    },
    {
      keywords: ['meta ads', 'facebook ads', 'instagram ads', 'paid social'],
      answer: {
        text: 'GrowthForge manages Meta Ads with full-funnel creative/testing strategy, audience design, and CRO alignment so paid social supports profitable growth.',
        links: [{ href: '/pricing', label: 'Explore pricing' }]
      }
    },
    {
      keywords: ['cro', 'conversion', 'landing page', 'funnel'],
      answer: {
        text: 'CRO is built into every engagement: funnel diagnosis, landing page improvements, offer/message testing, and analytics so more visitors become qualified leads.',
        links: [{ href: '/pricing', label: 'See CRO-focused plans' }]
      }
    },
    {
      keywords: ['automation', 'marketing automation', 'ai automation', 'crm automation', 'workflow'],
      answer: {
        text: 'GrowthForge designs automation systems across CRM, lead routing, nurturing, and reporting to reduce manual work and speed up revenue execution.',
        links: [{ href: '/pricing', label: 'Review Growth Accelerators' }]
      }
    },
    {
      keywords: ['executive consulting', 'leadership', 'advisory', 'consulting'],
      answer: {
        text: 'Executive consulting gives founders and operators strategic guidance on growth priorities, resource allocation, and AI-era go-to-market decisions.',
        links: [{ href: '/about', label: 'Learn about GrowthForge' }]
      }
    },
    {
      keywords: ['pricing', 'cost', 'plan', 'tier', 'growth audit', 'audit'],
      answer: {
        text: 'You can start with a Growth Audit ($750) or choose monthly partnerships based on execution depth and growth goals.',
        links: [{ href: '/pricing', label: 'See full pricing' }]
      }
    },
    {
      keywords: ['discovery', 'book', 'schedule', 'meeting', 'call'],
      answer: {
        text: 'The best next step is a complimentary 20-minute Growth Discovery Session to assess fit and priorities.',
        links: [{ href: '/discovery', label: 'Book discovery now' }]
      }
    },
    {
      keywords: ['contact', 'email', 'response time', 'reply', 'charlie'],
      answer: {
        text: 'You can reach GrowthForge at charlie@growthforge-ai.com. Typical response time is within 24 hours on business days.',
        links: [
          { href: 'mailto:charlie@growthforge-ai.com', label: 'Email GrowthForge' },
          { href: '/contact', label: 'Open contact page' }
        ]
      }
    }
  ];

  function getAnswer(query) {
    var normalized = query.toLowerCase();
    var bestMatch = null;
    var bestScore = 0;
    var bestKeywordLength = 0;
    var bestIntentIndex = Number.MAX_SAFE_INTEGER;

    for (var i = 0; i < intents.length; i += 1) {
      var intent = intents[i];
      var score = 0;
      var longestKeyword = 0;

      for (var j = 0; j < intent.keywords.length; j += 1) {
        var keyword = intent.keywords[j];
        if (normalized.indexOf(keyword) !== -1) {
          score += 1;
          if (keyword.length > longestKeyword) {
            longestKeyword = keyword.length;
          }
        }
      }

      if (
        score > bestScore ||
        (score === bestScore && longestKeyword > bestKeywordLength) ||
        (score === bestScore && longestKeyword === bestKeywordLength && i < bestIntentIndex)
      ) {
        bestScore = score;
        bestKeywordLength = longestKeyword;
        bestMatch = intent;
        bestIntentIndex = i;
      }
    }

    if (bestMatch) {
      return bestMatch.answer;
    }

    return fallbackAnswer;
  }

  function createMessage(type, contentNode) {
    var message = document.createElement('div');
    message.className = 'gf-chatbot-message gf-chatbot-message-' + type;
    message.appendChild(contentNode);
    return message;
  }

  function addUserMessage(messages, text) {
    var content = document.createElement('p');
    content.textContent = text.trim();
    messages.appendChild(createMessage('user', content));
  }

  function createBotContent(answer) {
    var content = document.createElement('p');
    if (typeof answer === 'string') {
      content.textContent = answer;
      return content;
    }

    content.textContent = answer.text;
    if (answer.links && answer.links.length) {
      content.appendChild(document.createTextNode(' '));
      for (var i = 0; i < answer.links.length; i += 1) {
        var link = answer.links[i];
        if (i > 0) {
          content.appendChild(document.createTextNode(i === answer.links.length - 1 ? ' or ' : ', '));
        }
        var anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.label;
        content.appendChild(anchor);
      }
      content.appendChild(document.createTextNode('.'));
    }

    return content;
  }

  function addBotMessage(messages, answer) {
    var autoScrollThreshold = Math.max(minAutoScrollThreshold, messages.clientHeight * autoScrollThresholdRatio);
    var nearBottom = messages.scrollHeight - messages.scrollTop - messages.clientHeight < autoScrollThreshold;
    messages.appendChild(createMessage('bot', createBotContent(answer)));
    if (nearBottom) {
      messages.scrollTop = messages.scrollHeight;
    }
  }

  function boot() {
    var root = document.createElement('div');
    root.className = 'gf-chatbot';
    root.innerHTML = `
      <button type="button" class="gf-chatbot-launcher" aria-label="Open GrowthForge chat assistant" aria-expanded="false" aria-controls="gf-chatbot-panel">
        <span class="gf-chatbot-launcher-label">Chat with GrowthForge</span>
        <span class="gf-chatbot-launcher-hint">Open assistant</span>
      </button>
      <section id="gf-chatbot-panel" class="gf-chatbot-panel" role="dialog" aria-label="GrowthForge chat assistant" hidden>
        <header class="gf-chatbot-header">
          <p><strong>GrowthForge Assistant</strong><span>Ask about services, pricing, or next steps.</span></p>
          <div class="gf-chatbot-header-actions">
            <button type="button" class="gf-chatbot-minimize" aria-label="Minimize chat assistant">Minimize</button>
          </div>
        </header>
        <div class="gf-chatbot-messages" aria-live="polite"></div>
        <div class="gf-chatbot-quick-actions" aria-label="Quick actions"></div>
        <form class="gf-chatbot-form" aria-label="Send a message">
          <label for="gf-chatbot-input" class="gf-chatbot-visually-hidden">Type your question</label>
          <input id="gf-chatbot-input" name="question" type="text" placeholder="Ask about pricing, ads, CRO..." autocomplete="off">
          <button type="submit">Send</button>
        </form>
      </section>`;

    document.body.appendChild(root);

    var launcher = root.querySelector('.gf-chatbot-launcher');
    var launcherHint = root.querySelector('.gf-chatbot-launcher-hint');
    var panel = root.querySelector('.gf-chatbot-panel');
    var minimizeButton = root.querySelector('.gf-chatbot-minimize');
    var messages = root.querySelector('.gf-chatbot-messages');
    var quickActionsContainer = root.querySelector('.gf-chatbot-quick-actions');
    var form = root.querySelector('.gf-chatbot-form');
    var input = root.querySelector('#gf-chatbot-input');

    addBotMessage(messages, welcomeMessage);

    quickActions.forEach(function (action) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'gf-chatbot-quick-action';
      button.textContent = action.label;
      button.addEventListener('click', function () {
        addUserMessage(messages, action.label);
        addBotMessage(messages, getAnswer(action.query));
      });
      quickActionsContainer.appendChild(button);
    });

    function setChatState(isOpen) {
      root.setAttribute('data-state', isOpen ? 'open' : 'minimized');
      launcher.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      launcher.setAttribute('aria-label', isOpen ? 'GrowthForge chat assistant is open' : 'Open GrowthForge chat assistant');
      launcherHint.textContent = isOpen ? 'Assistant open' : 'Reopen assistant';
    }

    function openPanel() {
      panel.hidden = false;
      setChatState(true);
      input.focus();
    }

    function closePanel() {
      panel.hidden = true;
      setChatState(false);
      launcher.focus();
    }

    launcher.addEventListener('click', function () {
      if (panel.hidden) {
        openPanel();
      } else {
        input.focus();
      }
    });

    minimizeButton.addEventListener('click', closePanel);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var question = input.value.trim();
      if (!question) {
        return;
      }

      addUserMessage(messages, question);
      addBotMessage(messages, getAnswer(question));
      input.value = '';
      input.focus();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !panel.hidden) {
        closePanel();
      }
    });

    setChatState(false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
