// Classroom posters for the shared practices - student-facing wording.
// Each poster links to a routine in content.js (same id). Staff guides are generated
// from the target data in content.js, so they need no separate content here.
// layout: "cards" (numbered cards), "columns" (big side-by-side steps), "cycle" (a loop).
window.POSTERS = {
  classroom: [
    { id: "full-sentence", routine: "full-sentence", area: "literacy", stage: "foundational", icon: "speak", layout: "columns",
      title: "Answer in a full sentence", subtitle: "Use the question's words to start your answer.",
      cards: [
        { h: "Listen", t: "Listen to the whole question." },
        { h: "Borrow the words", t: "Start with the words from the question." },
        { h: "Say it all", t: "Say the whole sentence, not just one word." }
      ],
      example: { h: "Try it", lines: ["What do koalas eat?", "→ Koalas eat eucalyptus leaves."] } },

    { id: "retell", routine: "retell", area: "literacy", stage: "foundational", icon: "ear", layout: "columns",
      title: "Say it back", subtitle: "Before we start, we say the steps back in order.",
      cards: [
        { h: "Listen", t: "Eyes on the speaker. Listen to every step." },
        { h: "Say it back", t: "First… next… last…" },
        { h: "Then start", t: "Now you know what to do." }
      ],
      example: { h: "Try it", lines: ["First we get our books.", "Next we find page 12.", "Last we read the first box."] } },

    { id: "discussion-stems", routine: "discussion-stems", area: "literacy", stage: "developing", icon: "chat", layout: "cards",
      title: "How we discuss", subtitle: "Use these to join in, build on ideas and disagree respectfully.",
      cards: [
        { h: "Agree", t: "I agree with ___ because…" },
        { h: "Add", t: "I'd like to add to what ___ said…" },
        { h: "Ask", t: "Can you explain what you mean by…?" },
        { h: "Disagree", t: "I see it differently because…" },
        { h: "Check first", t: "So you're saying… Have I got that right?" }
      ],
      example: { h: "Try it", lines: ["“I agree with Sam because the graph shows the temperature rising, and I'd add that it levels off after 1 pm.”"] } },

    { id: "oral-rehearsal", routine: "oral-rehearsal", area: "literacy", stage: "consolidating", icon: "speak", layout: "cards",
      title: "Say it before you write it", subtitle: "If you can say it clearly, you can write it clearly.",
      cards: [
        { h: "Think", t: "What is your answer in one sentence?" },
        { h: "Say it", t: "Tell your partner your sentence." },
        { h: "Make it stronger", t: "Add a reason: because… / This shows…" },
        { h: "Write it", t: "Write the sentence you just said." },
        { h: "Check it", t: "Read it back. Does it sound right?" }
      ],
      example: { h: "Try it", lines: ["Say: “Plants need sunlight because they use its energy to make food.”", "Then write exactly that."] } },

    { id: "bda", routine: "bda", area: "literacy", stage: "developing", icon: "book", layout: "columns",
      title: "Reading for meaning", subtitle: "Three steps for any text: words, maps, graphs and diagrams.",
      cards: [
        { h: "Before", t: "Look at the title, headings, pictures and graphs. What will this tell me? Set yourself a question." },
        { h: "During", t: "Stop after each section. Sum it up in one sentence. Note any new words." },
        { h: "After", t: "Answer your question using evidence from the text." }
      ],
      example: { h: "Reading a map?", lines: ["Before: read the title, key and scale.", "During: what pattern do you notice?", "After: what does it tell you about the place?"] } },

    { id: "source-questions", routine: "source-questions", area: "literacy", stage: "consolidating", icon: "search", layout: "cards",
      title: "Questions for any source", subtitle: "Ask these before you trust what a source says.",
      cards: [
        { h: "Who made it?", t: "A person, a company, a government, a scientist?" },
        { h: "Why was it made?", t: "To inform, persuade, sell or record?" },
        { h: "What evidence does it use?", t: "Data, eyewitnesses, quotes, or just opinion?" },
        { h: "How reliable is it?", t: "Could the maker have a reason to leave something out?" }
      ],
      example: { h: "Try it", lines: ["A 1916 Australian recruiting poster, made to persuade men to enlist:", "useful for showing attitudes at the time, but not reliable for facts about the war."] } },

    { id: "paragraph", routine: "paragraph", area: "literacy", stage: "developing", icon: "lines", layout: "cards",
      title: "Write a TEEL paragraph", subtitle: "Every paragraph, in every subject, follows TEEL.",
      cards: [
        { h: "Topic sentence", t: "Say what the paragraph is about." },
        { h: "Explanation", t: "Develop your point. Why does it matter?" },
        { h: "Evidence", t: "Back it up with an example, a quote or data." },
        { h: "Link", t: "Connect back to your topic sentence or the question." }
      ],
      example: { h: "Example · Year 6 HASS", lines: ["**T:** Defence was one reason the Australian colonies federated in 1901.", "**E:** Each colony had only a small defence force, and many colonists feared invasion.", "**E:** In 1889 a review of colonial defences recommended combining the colonies' forces.", "**L:** So defence helped bring about Federation."] } },

    { id: "cer", routine: "cer", area: "literacy", stage: "consolidating", icon: "blocks", layout: "columns",
      title: "Claim, evidence, reasoning", subtitle: "How to build an argument in Science, Humanities and English.",
      cards: [
        { h: "Claim", t: "Answer the question directly." },
        { h: "Evidence", t: "Give data, a quote or an observation that backs it up." },
        { h: "Reasoning", t: "Explain how the evidence proves your claim." }
      ],
      example: { h: "Example", lines: ["**Claim:** Dark surfaces absorb more heat than light ones.", "**Evidence:** The black card rose 9 °C; the white card rose 3 °C.", "**Reasoning:** In the same sunlight, the black card warmed three times as much, so it absorbed more energy."] } },

    { id: "sentence-strategies", routine: "sentence-strategies", area: "literacy", stage: "consolidating", icon: "lines", layout: "cards",
      title: "Sentence strategies", subtitle: "Short moves that make your sentences clearer and more precise.",
      cards: [
        { h: "Sentence or fragment?", t: "A sentence has a subject and a verb, and makes sense on its own." },
        { h: "because / but / so", t: "Give a reason, a contrast or a result." },
        { h: "Conjunctions", t: "Start or join with: although, unless, since, while, if." },
        { h: "Appositive", t: "Describe a noun beside it: “Chlorophyll, the green pigment in leaves, …”" },
        { h: "Expand it", t: "Add who, what, when, where, why or how." },
        { h: "Combine", t: "Join short sentences into one clear sentence." }
      ],
      example: { h: "because / but / so", lines: ["Exercise improves health **because** it strengthens the heart.", "Exercise improves health, **but** too much can cause injury.", "Exercise improves health, **so** schools build it into every week."] } },

    { id: "outlines", routine: "outlines", area: "literacy", stage: "consolidating", icon: "list", layout: "cards",
      title: "Plan before you write", subtitle: "Decide your structure first, in notes, not sentences.",
      cards: [
        { h: "One-sentence answer", t: "Write your topic sentence or thesis." },
        { h: "Points in notes", t: "Key words and evidence only. No full sentences yet." },
        { h: "One block per paragraph", t: "Longer answers: plan each paragraph as its own block." },
        { h: "Conclusion", t: "What does it all add up to?" },
        { h: "Check", t: "Does your draft follow your plan?" }
      ],
      example: { h: "A plan in notes", lines: ["**Thesis:** Federation happened for defence, trade and identity.", "¶1 defence → fear of invasion, no united army", "¶2 trade → tariffs at colonial borders", "¶3 identity → “Australian” not “colonial”"] } },

    { id: "revision", routine: "revision", area: "literacy", stage: "consolidating", icon: "edit", layout: "columns",
      title: "Revise, then edit", subtitle: "Make it better first. Make it correct second.",
      cards: [
        { h: "Revise", t: "Combine short, choppy sentences. Expand vague ones. Add transitions to link ideas." },
        { h: "Edit", t: "Check capitals, full stops and commas. Spell subject words correctly. Read it aloud." }
      ],
      example: { h: "Transitions by purpose", lines: ["**Time:** subsequently, meanwhile, previously", "**Example:** for instance, in particular, specifically", "**Change of direction:** however, conversely, nevertheless", "**Conclusion:** therefore, consequently, as a result"] } },

    { id: "no-unit", routine: "no-unit", area: "numeracy", stage: "developing", icon: "ruler", layout: "cards",
      title: "Measure it right", subtitle: "In Maths, Science, Technologies and PE.",
      cards: [
        { h: "Estimate first", t: "Make a sensible guess before you measure." },
        { h: "Choose the tool and unit", t: "mm, cm or m? g or kg? mL or L? seconds or minutes?" },
        { h: "Read the scale carefully", t: "Eye level. Start at zero. Count the small marks." },
        { h: "No unit, no mark", t: "Always write the unit with your answer." },
        { h: "Compare", t: "How close was your estimate?" }
      ],
      example: { h: "Example", lines: ["Estimate: 30 cm.  Measured: 27.5 cm.", "My estimate was 2.5 cm too long."] } },

    { id: "graph-conventions", routine: "graph-conventions", area: "numeracy", stage: "developing", icon: "chart", layout: "cards",
      title: "Every graph needs…", subtitle: "The same rules in every subject.",
      cards: [
        { h: "A title", t: "Say exactly what the graph shows." },
        { h: "Labelled axes", t: "Name each axis and give its unit, e.g. Temperature (°C)." },
        { h: "An even scale", t: "Equal steps between the numbers on each axis." },
        { h: "The right type", t: "Column graph for categories. Line graph for change over time." }
      ],
      example: { h: "Example", lines: ["**Title:** Classroom temperature, 9 am to 3 pm", "**Horizontal axis:** Time of day", "**Vertical axis:** Temperature (°C), in steps of 2"] } },

    { id: "investigation-cycle", routine: "investigation-cycle", area: "numeracy", stage: "consolidating", icon: "cycle", layout: "cycle",
      title: "Investigate with data", subtitle: "The same cycle in Maths, Science and Geography.",
      cards: [
        { h: "Question", t: "What do I want to find out?" },
        { h: "Collect", t: "Gather the data. Is the sample big enough?" },
        { h: "Represent", t: "Choose a table or graph that fits the data." },
        { h: "Analyse", t: "Mean, median, range. Patterns. Anything odd?" },
        { h: "Conclude", t: "Answer the question, and say what limits your answer." }
      ],
      example: { h: "Example", lines: ["Do Year 8s sleep less on school nights?", "Survey 60 students → dot plots → median 8.5 h vs 9.5 h →", "Yes, about an hour less. Limited: only one school, self-reported."] } },

    { id: "additive-or-multiplicative", routine: "additive-or-multiplicative", area: "numeracy", stage: "consolidating", icon: "plustimes", layout: "columns",
      title: "Add or multiply?", subtitle: "Before you calculate, decide what kind of change it is.",
      cards: [
        { h: "Adding", t: "An amount is added or taken away. Look for: more, less, increase by, difference." },
        { h: "Multiplying", t: "Everything is scaled by a factor. Look for: times as many, per, for every, %, scale, ratio." }
      ],
      example: { h: "Try it", lines: ["An Anzac biscuit recipe uses 90 g of rolled oats to make 20 biscuits. How much for 30?", "Not 90 + 10. It's a scale: 30 ÷ 20 = 1.5, so 90 × 1.5 = **135 g**."] } },

    { id: "data-claim", routine: "data-claim", area: "numeracy", stage: "extending", icon: "question", layout: "cards",
      title: "Check the claim", subtitle: "Before you believe a statistic, ask four questions.",
      cards: [
        { h: "Who and how many?", t: "Who collected the data, and how big was the sample?" },
        { h: "Is the graph honest?", t: "Does the axis start at zero? Is the scale even? Is the time frame cherry-picked?" },
        { h: "Cause or connection?", t: "Does it show one thing causes another, or only that they happen together?" },
        { h: "What's missing?", t: "What else could explain the result?" }
      ],
      example: { h: "Try it", lines: ["“Students who eat breakfast get better marks, so breakfast causes better marks.”", "Ask: how many students? What else might explain both: sleep, routine, support at home?"] } },

    // ---- Subject examples: a shared practice applied in one subject and year level.
    // These replace the original three infographics. "target" links each to its target page.
    { id: "science-y9-report-writing", routine: "cer", subject: "Year 9 Science", target: "literacy.consolidating.writing", area: "literacy", stage: "consolidating", icon: "blocks", layout: "cards",
      title: "Writing up your results", subtitle: "Argue from your evidence: claim, evidence, reasoning.",
      cards: [
        { h: "Claim", t: "Answer the investigation question in one clear sentence." },
        { h: "Evidence", t: "Quote your data: numbers with units, and the trend in your table or graph." },
        { h: "Reasoning", t: "Explain the science that links your evidence to your claim. Use your scientific vocabulary." },
        { h: "Evaluate", t: "How reliable is your evidence? Name errors or anomalies, and how to improve the method." }
      ],
      example: { h: "Example · conservation of mass", lines: ["**Claim:** In a closed system, mass is conserved in a chemical reaction.", "**Evidence:** Vinegar and bicarb soda in a sealed bag: 152.4 g before and after. In an open beaker: 1.8 g lost.", "**Reasoning:** Atoms are rearranged, not created or destroyed. In the open beaker, carbon dioxide gas escaped.", "**Evaluate:** Three trials each; the balance reads to 0.1 g."] } },

    { id: "geography-y7-reading", routine: "bda", subject: "Year 7 Geography", target: "literacy.consolidating.reading", area: "literacy", stage: "consolidating", icon: "book", layout: "columns",
      title: "Reading for meaning in Geography", subtitle: "Maps, graphs, photos and statistics are texts too.",
      cards: [
        { h: "Before", t: "Read the title, key, scale and source. What is this about? Set yourself a question." },
        { h: "During", t: "Stop at each section, map or graph. What pattern do you see? Note new geography words." },
        { h: "After", t: "Answer your question with evidence: quote a figure, a place or a trend." }
      ],
      example: { h: "Reading a climate graph for Darwin", lines: ["**Before:** title and place; months along the bottom; rainfall bars (mm); temperature line (°C).", "**During:** which months are wettest? Which are driest?", "**After:** “Darwin has a wet season from about November to April and a dry season from May to October.”"] } },

    { id: "technology-y5-measurement", routine: "no-unit", subject: "Year 5 Design and Technologies", target: "numeracy.developing.mg", area: "numeracy", stage: "developing", icon: "ruler", layout: "cards",
      title: "Units and measurement", subtitle: "Measure like a designer, so what you make fits.",
      cards: [
        { h: "Always include the unit", t: "Write 120 mm, not 120." },
        { h: "Choose the right unit", t: "mm for small parts, cm for models, m for rooms and gardens." },
        { h: "Read the ruler carefully", t: "Start at zero. Look straight down. Count the small marks." },
        { h: "Label diagrams clearly", t: "Every length on your drawing has a number and a unit." }
      ],
      example: { h: "My design · possum nesting box", lines: ["Roof: 300 mm × 250 mm. Base: 220 mm × 220 mm.", "Entry hole: 70 mm across.", "Every length labelled in mm on the drawing."] } }
  ]
};
