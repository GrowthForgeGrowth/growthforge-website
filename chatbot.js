(function () {

var quickActions = [

    {
        label: 'Find Revenue Leaks',
        query: 'Identify the biggest revenue leaks limiting my business growth'
    },

    {
        label: 'Executive Growth Audit',
        query: 'Tell me about the Executive Growth Audit'
    },

    {
        label: 'Analyze My Website',
        query: 'Analyze my website and identify my biggest growth opportunities'
    },

    {
        label: 'Build a Growth Strategy',
        query: 'I need an executive growth strategy for my business'
    }

];

var fallbackAnswer = {

    text:
        'Every business has one growth constraint that limits revenue.\n\n' +

        'Tell me:\n\n' +

        '• Your website\n' +

        '• Your industry\n' +

        '• Your biggest growth challenge\n\n' +

        'I\'ll recommend the best next step.',

    links:[

        {

            href:'/discovery',

            label:'Book Executive Growth Audit'

        }

    ]

};

 var welcomeMessage =
'Welcome to GrowthForge.\n\n' +

'I\'m your Executive Growth Advisor.\n\n' +

'I help founders, CEOs, and marketing leaders identify growth constraints before they invest more in marketing.\n\n' +

'You can:\n\n' +

'• Learn about the Executive Growth Audit\n' +

'• Ask about AI SEO, GEO, Paid Media, CRO, or Automation\n' +

'• Find the biggest growth opportunity in your business\n\n' +

'Or simply tell me your website to begin.';
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
    keywords: ['google ads',
'ppc',
'search ads',
'paid search',
'google advertising',
'cost per click',
'cpc',
'paid traffic'],
    answer: {

        text:
            'Google Ads should generate profitable revenue—not just clicks. GrowthForge designs and optimizes paid search strategies that improve lead quality, conversion performance, customer acquisition efficiency, and return on advertising investment.\n\n' +

            'Every engagement begins with an Executive Growth Audit, where we evaluate your advertising strategy, campaign structure, conversion tracking, landing pages, attribution, and budget allocation before delivering executive recommendations and a prioritized 90-day growth roadmap.',

        links:[

            {
                href:'/discovery',
                label:'Start Executive Growth Audit'
            },

            {
                href:'/google-ads-management',
                label:'Learn More About Google Ads'
            }

        ]

    }

},
    {
    keywords: ['facebook ads',
'instagram ads',
'meta ads',
'paid social',
'facebook marketing',
'instagram marketing'],
    answer: {

        text:
            'Successful Meta Ads campaigns do more than generate impressions—they create qualified demand and profitable customer acquisition. GrowthForge develops paid social strategies that combine audience targeting, creative testing, landing page optimization, and conversion measurement to maximize return on advertising investment.\n\n' +

            'Every engagement begins with an Executive Growth Audit, where we evaluate your advertising strategy, creative performance, audience segmentation, funnel effectiveness, attribution, and budget allocation before delivering executive recommendations and a prioritized 90-day growth roadmap.',

        links:[

            {
                href:'/discovery',
                label:'Start Executive Growth Audit'
            },

            {
                href:'/meta-ads-management',
                label:'Learn More About Meta Ads'
            }

        ]

    }

},

    {
    keywords: [
        'ai seo',
'geo',
'generative engine optimization',
'generative search',
'ai search',
'ai visibility',
'llm seo',
'chatgpt seo',
'perplexity',
'google ai overview',
'ai ranking',
'entity seo'
    ],

    answer: {

        text:
            'AI Search is changing how buyers discover businesses. GrowthForge helps organizations improve visibility across Google Search and AI assistants through AI SEO, Generative Engine Optimization (GEO), technical SEO, entity optimization, citation-ready content, and authority building.\n\n' +

            'The Executive Growth Audit identifies your biggest AI Search opportunities and prioritizes the initiatives with the greatest commercial impact.',

        links:[

            {
                href:'/discovery',
                label:'Start Executive Growth Audit'
            },

            {
                href:'/ai-seo-for-b2b-saas',
                label:'Learn More About AI SEO'
            }

        ]

    }

},
    
{
    keywords: ['cro', 'conversion', 'landing page', 'funnel'],
    answer: {

        text:
            'Increasing traffic is only valuable if more visitors become qualified customers. GrowthForge improves conversion performance by identifying friction across your landing pages, messaging, offers, user experience, and conversion funnel to maximize the value of every visitor.\n\n' +

            'Every engagement begins with an Executive Growth Audit, where we diagnose the highest-impact conversion constraints, prioritize opportunities based on business impact, and deliver an executive assessment with strategic recommendations and a 90-day roadmap.',

        links:[

            {
                href:'/discovery',
                label:'Start Executive Growth Audit'
            },

            {
                href:'/conversion-rate-optimization',
                label:'Learn More About CRO'
            }

        ]

    }

},
    {
    keywords: ['automation',
'ai automation',
'crm',
'crm automation',
'workflow',
'n8n',
'zapier',
'hubspot',
'salesforce'],
    answer: {

        text:
            'As businesses grow, manual processes become a barrier to scalability. GrowthForge designs AI-powered marketing automation systems that streamline lead capture, qualification, CRM workflows, nurturing, reporting, and operational processes—allowing teams to scale more efficiently while improving speed, consistency, and customer experience.\n\n' +

            'Every engagement begins with an Executive Growth Audit, where we identify automation opportunities, operational bottlenecks, and workflow inefficiencies before delivering executive recommendations and a prioritized 90-day roadmap aligned with your growth objectives.',

        links:[

            {
                href:'/discovery',
                label:'Start Executive Growth Audit'
            },

            {
                href:'/marketing-automation',
                label:'Learn More About Marketing Automation'
            }

        ]

    }

},
    {
    keywords: [
       'executive consulting',
'consulting',
'advisory',
'business strategy',
'growth strategy',
'strategy',
'strategic planning',
'go to market',
'gtm',
'revenue strategy',
'marketing strategy',
'growth consultant',
'business consultant',
'advisor'
    ],

    answer: {

        text:
            'Sustainable business growth requires more than marketing execution—it requires executive-level strategy. GrowthForge partners with founders, CEOs, and executive teams to identify commercial growth opportunities, prioritize strategic initiatives, optimize marketing investments, and build scalable growth systems that support long-term revenue growth.\n\n' +

            'Every engagement begins with an Executive Growth Audit, where we evaluate your business strategy, market positioning, growth opportunities, AI readiness, marketing performance, and operational constraints before delivering executive recommendations and a prioritized 90-day growth roadmap.',

        links:[

            {
                href:'/discovery',
                label:'Start Executive Growth Audit'
            },

            {
                href:'/about',
                label:'Learn About GrowthForge'
            }

        ]

    }

},
    {
    keywords: [
        'pricing',
        'price',
        'cost',
        'plans',
        'plan',
        'fees',
        'investment',
        'quote',
        'proposal',
    ],

    answer: {

        text:
            'GrowthForge is designed as a long-term growth partner rather than a traditional marketing agency. Every engagement begins with an Executive Growth Audit—the foundation for identifying your highest-impact growth opportunities before recommending any ongoing partnership.\n\n' +

            'The Executive Growth Audit is a one-time investment of $750 and includes an executive assessment of your AI visibility, SEO, paid media, website performance, conversion funnel, analytics, automation, competitive positioning, prioritized recommendations, and a strategic 90-day growth roadmap. Based on the findings, we recommend the partnership that best aligns with your business objectives.',

        links:[

            {
                href:'/discovery',
                label:'Start Executive Growth Audit'
            },

            {
                href:'/pricing',
                label:'View Pricing'
            }

        ]

    }

},
   {
    keywords: [
        'executive growth audit',
        'growth audit',
        'audit',
        'assessment',
        'analysis',
        'review',
        'evaluate',
        'website audit',
        'marketing audit',
        'growth assessment'
    ],

    answer: {

        text:
            'The Executive Growth Audit is the starting point for every GrowthForge engagement. Rather than making assumptions, we conduct a comprehensive evaluation of your AI visibility, SEO, paid media, website performance, conversion funnel, analytics, automation, competitive positioning, and overall growth strategy.\n\n' +

            'You\'ll receive an executive-level assessment, prioritized recommendations, and a strategic 90-day roadmap focused on the initiatives with the greatest potential business impact.',
        links:[

            {
                href:'/discovery',
                label:'Start Executive Growth Audit'
            },

            {
                href:'/pricing',
                label:'View Pricing'
            }

        ]

    }

},
    {
    keywords: [
        'contact',
        'email',
        'charlie',
        'reach',
        'message',
        'support',
        'question',
        'help'
    ],

    answer: {

        text:
            'You can contact GrowthForge directly at charlie@growthforge-ai.com for general enquiries, partnership opportunities, or questions about our services.\n\n' +

            'If you want to understand what is limiting your business growth, the Executive Growth Audit is the recommended starting point. GrowthForge conducts a comprehensive executive assessment of your AI Search visibility, SEO, website performance, paid media, conversion funnel, analytics, automation, and growth strategy to identify your highest-impact opportunities. You\'ll receive executive recommendations and a prioritized 90-day growth roadmap focused on accelerating qualified pipeline, revenue growth, and long-term business performance.',

        links:[

            {
                href:'/discovery',
                label:'Start Executive Growth Audit'
            },

            {
                href:'mailto:charlie@growthforge-ai.com',
                label:'Email GrowthForge'
            }

        ]

    }

},
{
    keywords: [

        'revenue',
        'grow revenue',
        'increase revenue',
        'business growth',
        'growth',
        'sales growth',
        'pipeline',
        'qualified leads'

    ],

    answer: {

        text:
            'Sustainable revenue growth comes from improving the entire growth system—not optimizing individual marketing channels in isolation. GrowthForge evaluates your AI visibility, SEO, paid media, website, conversion funnel, analytics, automation, and growth strategy to identify the commercial constraints limiting business performance.\n\n' +

            'Every engagement begins with an Executive Growth Audit, where we deliver an executive assessment, prioritized recommendations, and a strategic 90-day roadmap focused on measurable business outcomes.',

        links:[

            {
                href:'/discovery',
                label:'Start Executive Growth Audit'
            },

            {
                href:'/growth-consultancy-vs-marketing-agency',
                label:'Why a Growth Consultancy?'
            }

        ]

    }

},
   
{
    keywords:[

        'low conversion',
        'conversion rate',
        'website conversion',
        'not converting',
        'landing page'

    ],

    answer:{

        text:
            'Traffic only creates business value when visitors become customers. GrowthForge identifies the conversion bottlenecks across messaging, user experience, offers, trust signals, and funnel design before prioritizing the highest-impact improvements.\n\n' +

            'The Executive Growth Audit delivers an executive assessment and a 90-day roadmap focused on increasing conversion efficiency and revenue growth.',

        links:[

            {
                href:'/discovery',
                label:'Start Executive Growth Audit'
            }

        ]

    }

},

   {
    keywords: [
        'website',
        'website assessment',
        'website audit',
        'analyze website',
        'analyze my website',
        'website review',
        'review my website',
        'growth opportunities',
        'website analysis'
    ],

    answer: {

        text:
            'Your website is often the biggest driver—or constraint—of business growth. GrowthForge evaluates your AI visibility, SEO, website performance, messaging, conversion funnel, user experience, analytics, automation, and competitive positioning to identify the highest-impact opportunities for growth.\n\n' +

            'The Executive Growth Audit provides an executive-level assessment, prioritized recommendations, and a strategic 90-day roadmap designed to improve qualified pipeline, conversion performance, and sustainable revenue growth.',

        links:[

            {
                href:'/discovery',
                label:'Start Executive Growth Audit'
            },

            {
                href:'/pricing',
                label:'View Pricing'
            }

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

                score++;

                if (keyword.length > longestKeyword) {
                    longestKeyword = keyword.length;
                }

            }

        }

        if (
            score > bestScore ||
            (score === bestScore && longestKeyword > bestKeywordLength) ||
            (score === bestScore &&
                longestKeyword === bestKeywordLength &&
                i < bestIntentIndex)
        ) {

            bestScore = score;
            bestKeywordLength = longestKeyword;
            bestMatch = intent;
            bestIntentIndex = i;

        }

    }

    return bestMatch ? bestMatch.answer : fallbackAnswer;

}

function createMessage(type, contentNode) {

    var message = document.createElement('div');

    message.className =
        'gf-chatbot-message gf-chatbot-message-' + type;

    message.appendChild(contentNode);

    return message;

}

function addUserMessage(messages, text) {

    var content = document.createElement('p');

    content.textContent = text.trim();

    messages.appendChild(
        createMessage('user', content)
    );

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

                content.appendChild(
                    document.createTextNode(
                        i === answer.links.length - 1
                            ? ' or '
                            : ', '
                    )
                );

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

    var autoScrollThreshold = Math.max(
        minAutoScrollThreshold,
        messages.clientHeight * autoScrollThresholdRatio
    );

    var nearBottom =
        messages.scrollHeight -
        messages.scrollTop -
        messages.clientHeight <
        autoScrollThreshold;

    messages.appendChild(
        createMessage(
            'bot',
            createBotContent(answer)
        )
    );

    if (nearBottom) {
        messages.scrollTop = messages.scrollHeight;
    }

})();
