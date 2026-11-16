// TGS Literacy and Numeracy Framework - site content.
// Sources: Literacy and Numeracy Framework (Edition 1), TGS Literacy and Numeracy Statement,
// Literacy and Numeracy Targets - Draft (stage targets, lead methods, subject tables),
// Simplifying Literacy and Numeracy Progressions. Curriculum codes are NOT stored here:
// they are read from data/workbook.js, which is generated from the alignment workbook.
// Text may use **bold** and *italic*.

window.CONTENT = {
  meta: {
    school: "Toowoomba Grammar School",
    title: "Literacy and Numeracy Framework",
    status: "Draft for review — November 2026"
  },

  stages: [
    { id: "foundational", name: "Foundational", years: "P–2", long: "Prep–Year 2", targetYear: "2", colour: "#4472C4",
      plain: "Building the basics through explicit teaching and guided practice." },
    { id: "developing", name: "Developing", years: "Years 3–6", long: "Years 3–6", targetYear: "6", colour: "#548235",
      plain: "Applying skills with growing independence, across subjects." },
    { id: "consolidating", name: "Consolidating", years: "Years 7–9", long: "Years 7–9", targetYear: "9", colour: "#BF8F00",
      plain: "Meeting the specific demands of each subject with confidence." },
    { id: "extending", name: "Extending", years: "Years 10–12", long: "Years 10–12", targetYear: "10", colour: "#A5391A",
      plain: "Using literacy and numeracy with sophistication and authority." }
  ],

  subjects: [
    { id: "science", name: "Science", workbook: "Science" },
    { id: "humanities", name: "Humanities", workbook: "Humanities",
      note: "HASS from Prep; History, Geography, Civics and Citizenship, and Economics and Business from Year 7." },
    { id: "hpe", name: "Health and PE", workbook: "Health and PE",
      note: "Achievement standards cover two year levels each from Year 1, so the same link applies across each band." },
    { id: "technologies", name: "Technologies", workbook: "Technologies",
      note: "Design and Technologies, and Digital Technologies. Achievement standards cover two year levels each from Year 1." }
  ],

  overview: {
    // Home page rationale, adapted from the Framework introduction (sections 1 and 1.1).
    rationale: "Toowoomba Grammar School teaches literacy and numeracy explicitly and consistently, in every year level and every subject, from Prep to Year 12. In a P–12 boarding school, students move through thirteen year levels, two schools and dozens of classrooms. Consistency between year levels, subjects and schools is what makes this approach work.",
    principles: [
      { t: "One shared approach, Prep to Year 12", d: "Four developmental stages and the same language in every classroom, so what a student learns in one year and one subject builds on the last." },
      { t: "English and Mathematics lead; every subject applies", d: "English and Mathematics carry the main explicit teaching. Every other subject has a genuine, defined role in reinforcing and applying it." },
      { t: "Explicit teaching, grounded in research", d: "Skills are taught explicitly, consistent with the science of learning, and written alongside the TGS professional development program." }
    ],
    // Adapted from the TGS Literacy and Numeracy Statement (plain language, no citations).
    statementLiteracy: "Literacy is a student's capacity to understand, speak, listen, read and write with confidence and precision, in ways that grow more sophisticated as they move through school. English is where these skills are built; every other subject gives students a genuine opportunity to use and strengthen them. A historian, a scientist and a mathematician each read and write differently, and TGS teaches students to do so with skill in every context.",
    literacyGoal: "A full, cohesive literacy program that helps every student become a more capable speaker, listener, reader and writer.",
    statementNumeracy: "Numeracy is a student's capacity to recognise, use and reason with mathematical ideas in real situations: not only in the Mathematics classroom, but wherever number, measurement, data and pattern genuinely appear. Mathematics builds the underlying skills; every other subject gives students a genuine opportunity to recognise and apply them.",
    numeracyGoal: "A numeracy-aware curriculum across every subject, so real opportunities to use mathematics are never overlooked, and students learn to ground real-world decisions in sound mathematical reasoning.",
    intention: "A boy at Toowoomba Grammar School moves through thirteen year levels and dozens of classrooms. A shared, deliberate approach to reading, writing, speaking and using numbers means this critical learning is not left to chance: what he practises in Science or History strengthens the same skills he is building in English and Mathematics.",
    goal: "A boy who reaches Year 12 having practised these same expectations in every subject, every year, is far better prepared to use literacy and numeracy in the real world than one who has met them only sometimes, and only somewhere. That consistency is what this Framework exists to protect.",
    why: [
      "Literacy and numeracy shape success in almost every area of learning, so they cannot belong to one subject.",
      "English and Mathematics teach the skills explicitly. Every other subject strengthens them, makes them specific and extends them.",
      "The ACARA progressions describe far more than any school can target at once. The Framework names **one focus per domain at each stage** so effort is concentrated and shared.",
      "Consistency across year levels, subjects and the Junior and Senior Schools is what makes the approach work in a P–12 boarding school."
    ],
    documents: [
      { name: "Literacy and Numeracy Statement", what: "A short, outward-facing summary for parents and new staff." },
      { name: "Literacy and Numeracy Framework", what: "Definitions, the four stages, roles and the research behind them. This site is built on it." },
      { name: "Stage targets and teaching methods", what: "One target per domain per stage, the English and Mathematics lead methods, and a strategy for every subject." },
      { name: "Progressions alignment workbook", what: "Each ACARA sub-element mapped to Australian Curriculum content descriptors, Foundation–Year 10, plus subject evidence tables." },
      { name: "Whole School Literacy and Numeracy Plans", what: "Year-by-year objectives and measurement. Still to be written." },
      { name: "Implementation handbook and intervention plan", what: "Classroom routines, PD sequence and Tier 1–3 intervention. Still to be written; this site's Implementation section is its starting point." }
    ]
  },

  literacy: {
    id: "literacy",
    name: "Literacy",
    lead: "English",
    leadWho: "Taught by the Junior School class teacher in English time (P–6) and by the English faculty (7–10).",
    definition: "The capacity to understand, interpret, evaluate and create meaning through spoken, written, visual and digital language in increasingly specialised contexts.",
    plain: "A boy's capacity to understand, speak, read and write with confidence and precision, in ways that grow more sophisticated as he moves through school.",
    challenge: "Literacy's challenge is **instructional**: every subject teaches and reinforces shared skills. From Year 7, reading becomes disciplinary reading, and teaching it is each subject's responsibility.",
    domains: [
      { id: "sl", name: "Speaking and Listening", plain: "Listening closely, and speaking clearly and with confidence.",
        def: "Making sense of spoken language and speaking clearly, using vocabulary and structure suited to audience and purpose.",
        parts: ["**Listening** — building meaning from spoken and audio texts.", "**Interacting** — clarifying, questioning and building shared understanding.", "**Speaking** — choosing language, structure and delivery for audience and purpose."] },
      { id: "reading", name: "Reading", plain: "Making sense of texts, from simple stories to complex ideas.",
        def: "Decoding and comprehending meaning in a text, including vocabulary, fluency, and literal and inferred meaning.",
        parts: ["**Word recognition** — phonological awareness, decoding and sight recognition, becoming automatic.", "**Language comprehension** — background knowledge, vocabulary, language structures and reasoning, becoming strategic."] },
      { id: "writing", name: "Writing", plain: "Writing with clarity, accuracy and purpose.",
        def: "Producing written text for a range of purposes and audiences, short and extended.",
        parts: ["**Product** — handwriting and keyboarding, spelling, sentences, grammar and punctuation, taught until they need little conscious attention.", "**Process** — planning, drafting, revising, editing and publishing.", "**Genre** — recounting, narrating, informing, persuading and explaining."] }
    ],
    focus: {
      foundational: { sl: "Building vocabulary and oral participation through modelled talk and structured listening.", reading: "Constrained foundations: phonological awareness, phonics, word recognition, fluency.", writing: "Product mechanics: letter formation, spelling patterns, simple sentence construction." },
      developing: { sl: "Structured discussion and presentation across subjects, using shared vocabulary.", reading: "Shift from decoding to purposeful comprehension across text types.", writing: "Genre awareness and paragraph-level control; Year 6 bridges into disciplinary writing." },
      consolidating: { sl: "Explaining, justifying and debating ideas using subject-specific language.", reading: "Disciplinary reading: subject-specific text structures and vocabulary.", writing: "Extended, evidence-based writing with growing subject-specific control." },
      extending: { sl: "Sustained, structured argument and presentation for varied audiences.", reading: "Critical, evaluative reading of complex and specialised texts.", writing: "Sustained analytical and evaluative writing with subject-specific authority." }
    },
    targets: {
      foundational: { sl: "Follow multi-step spoken instructions, and answer and explain in full sentences using taught topic words.", reading: "Decode unfamiliar words accurately and read Year 2 text aloud fluently, at a pace and with phrasing that supports understanding.", writing: "Write correctly formed, correctly punctuated simple and compound sentences, spelling taught patterns accurately." },
      developing: { sl: "Present and discuss ideas in structured talk, building on others' ideas and using subject vocabulary.", reading: "Read informative texts independently and explain the main idea, key details and inferences, including from diagrams and tables.", writing: "Write a well-structured TEEL paragraph (topic sentence, explanation, evidence, link) suited to its purpose." },
      consolidating: { sl: "Explain and justify a position aloud using subject vocabulary and evidence.", reading: "Read each subject's key text types and identify their purpose, structure and key information.", writing: "Plan and write multi-paragraph, evidence-based responses in accurate, varied sentences." },
      extending: { sl: "Deliver a sustained, structured argument adapted to audience and purpose.", reading: "Critically evaluate the claims, evidence and perspective in complex subject texts.", writing: "Write sustained analytical responses that bring together several sources, and revise and edit them independently." }
    },
    measure: {
      foundational: "Phonics/decoding and fluency checks; Year 2 writing sample; oral language checklist **[audit]**",
      developing: "NAPLAN Years 3 and 5; PAT-R; cross-subject paragraph task",
      consolidating: "NAPLAN Years 7 and 9; PAT-R; moderated extended response",
      extending: "Faculty assessment; moderated Year 10 writing sample **[audit]**"
    },
    method: {
      foundational: { sl: "Teacher models listening routines. Instructions are checked by asking a student to retell them. A small set of topic words is taught explicitly each unit, with full-sentence answers modelled (“A mammal is…”).", reading: "Daily, systematic, sequenced phonics lesson. Practice texts are matched to the code already taught. Fluency is built through modelled, repeated and partner reading.", writing: "Short, frequent handwriting practice using one school letter-formation model. Spelling is taught alongside phonics. Students say a sentence, then write it, with the teacher modelling first." },
      developing: { sl: "Whole-school discussion stems (“I agree with… because…”) are taught explicitly. A planned oral presentation is assessed against a shared speaking rubric.", reading: "Teacher shows how each text type is organised before reading. Key vocabulary is taught with prefixes, roots and suffixes. A before/during/after reading routine is used. Fluency practice continues to Year 4.", writing: "The TEEL paragraph (topic sentence, explanation, evidence, link) is modelled, then guided, then written independently. Genre is named and its structure taught. Sentence combining and expansion use content from other subjects." },
      consolidating: { sl: "Students say it before they write it. Sentence strategies are done aloud first. Structured debate and discussion with a “paraphrase before you respond” rule.", reading: "The English faculty teaches the general reading of literary, persuasive and media texts. *Because / but / so* tasks double as comprehension checks. Disciplinary reading is taught by each subject.", writing: "**Sentence strategies taught in an agreed order:** sentence vs fragment; *because / but / so*; subordinating conjunctions; appositives; expanding a short sentence; sentence combining. **Planning:** single-paragraph outline (Year 7), then multiple-paragraph outline (Years 8–9)." },
      extending: { sl: "Assessed oral presentations and seminar discussions with prepared positions.", reading: "Paired texts that disagree. Explicit analysis of how language positions the reader.", writing: "Multiple-paragraph outline with a clear thesis. Transition words taught by purpose. Revision is a separate, taught step: combine, expand, add transitions. Students use a self-editing checklist." }
    },
    acrossSubjects: {
      foundational: "Literacy demands are broadly shared across subjects — oral vocabulary, following instructions, early print concepts.",
      developing: "Subjects increasingly draw on common information texts (reports, explanations); demands remain largely shared, not yet discipline-specific.",
      consolidating: "Subjects begin to require their own text types and technical vocabulary — the disciplinary literacy shift begins here.",
      extending: "Literacy demands are fully discipline-specific: students read, write and argue as historians, scientists and other disciplinary specialists in training."
    },
    pedagogy: [
      { el: "Writing mechanics (Product)", how: "Modelled, then guided, then independent practice of sentence and paragraph construction, using shared TGS terminology." },
      { el: "Disciplinary reading and writing", how: "Explicit teaching of the subject's own text structures and technical vocabulary, rather than assuming English has already covered it." },
      { el: "Speaking and listening", how: "Modelled and practised oral structures (explaining, presenting, justifying) appropriate to each subject's discourse." }
    ],
    subjectCells: {
      science: {
        foundational: {
          sl: { l: "Speaking and listening is the main literacy demand. Students “share questions, predictions, observations and ideas”.", s: "Observation stems (“I observed… I think… because…”). Instructions for a practical are retold before students start." },
          reading: { l: "Not in the achievement standard.", gap: true, s: "Read-alouds of simple science texts, with topic words displayed and used." },
          writing: { l: "“make and record observations” (Yr 1); “use everyday and scientific vocabulary” (Yr 2).", s: "Sentence frames for recording observations, with capital letters and full stops expected." } },
        developing: {
          sl: { l: "Comparing findings with others (Yr 3); communicating findings to an audience (Yr 4).", s: "After an investigation, discuss results using the whole-school stems, then give a short findings presentation." },
          reading: { l: "Not in the achievement standard.", gap: true, s: "Before students read, show how a procedure and a science report are organised. Teach key vocabulary in advance." },
          writing: { l: "“use language features that reflect their purpose and audience” (Yr 5); “select evidence to support reasoned conclusions” (Yr 6).", s: "A TEEL conclusion paragraph: topic sentence (the finding), explanation, evidence from the data, link back to the investigation question." } },
        consolidating: {
          sl: { l: "Constructing arguments (Yr 7); communicating to specific audiences (Yr 8).", s: "Claim–evidence–reasoning said aloud before writing. Structured debate on a scientific claim." },
          reading: { l: "Inferred only: interpreting secondary data (Yr 7), science communication (Yr 8), publication and peer review (Yr 9).", gap: true, s: "Explicitly teach how to read a method, a results table and a science news article. *Because / but / so* comprehension checks." },
          writing: { l: "“construct arguments to support or dispute claims” (Yr 7) building to “construct logical arguments based on evidence” (Yr 9).", s: "Claim–evidence–reasoning paragraphs planned with an outline. Sentence strategies practised with science content." } },
        extending: {
          sl: { l: "Communication for “diverse audiences” (Yr 10).", s: "Present investigation findings to a non-specialist audience." },
          reading: { l: "Publication and peer review, now analysed (Yr 10).", s: "Paired reading of a research summary and a media report of the same study. Students judge whether the media report represents the claim accurately." },
          writing: { l: "“logical arguments based on analysis of a variety of evidence” (Yr 10).", s: "Multiple-paragraph outline for research and practical reports. Revision is a taught step." } }
      },
      humanities: {
        foundational: {
          sl: { l: "“pose questions”, “share narratives and observations” (Yr 1), “present narratives” (Yr 2).", s: "Oral retell of a past event in sequence, using time words (first, then, long ago)." },
          reading: { l: "Implicit; students interpret provided sources.", s: "Read-aloud of a source or picture with planned who/what/when questions." },
          writing: { l: "“sort and record information from observations and provided sources”.", s: "Labelled pictures and one-sentence records using sentence frames." } },
        developing: {
          sl: { l: "Implied; students present descriptions and explanations to others.", s: "Short inquiry presentation assessed against the shared rubric. Whole-school discussion stems." },
          reading: { l: "“interpret information and data in different formats” (Yr 3) building to “evaluate sources to determine origin, purpose and perspectives” (Yr 6).", s: "Before/during/after reading with maps, timelines and sources. Source questions taught explicitly." },
          writing: { l: "“present descriptions and explanations” using subject terms (Yrs 3–6).", s: "A cause-and-effect TEEL paragraph, supported by a subject word bank." } },
        consolidating: {
          sl: { l: "Implied; students present arguments and responses.", s: "Structured debate on a historical or civic issue, with “paraphrase before you respond”." },
          reading: { l: "History: “locate and identify primary and secondary sources” (Yr 7), compare their reliability (Yr 8), contested interpretations (Yr 9). Geography: interpret data.", s: "Explicitly teach how to read a source, a map and a data display. Use the same source questions as Science (Who made it? Why? What evidence does it use?)." },
          writing: { l: "“historical arguments”, “descriptions, explanations and responses” (Yr 7) building to “evidence-based arguments” (Yr 9).", s: "Outlines for historical arguments; *because / but / so* on unit content; appositives to introduce a source (“Monash, the Australian commander at Hamel, wrote…”)." } },
        extending: {
          sl: { l: "Implied; synthesis-level arguments presented to an audience.", s: "Seminar discussion of contested interpretations, with positions prepared in advance." },
          reading: { l: "“synthesise the information in sources”; “compare and evaluate different and contested historical interpretations” (Yr 10).", s: "Paired contested sources, with students evaluating perspective and language." },
          writing: { l: "Arguments “that synthesise evidence from sources” (Yr 10).", s: "Multiple-paragraph outline with a thesis, referencing conventions taught explicitly, and a revision step." } }
      },
      hpe: {
        foundational: {
          sl: { l: "“describe similarities and differences”; interact respectfully.", s: "Game instructions retold before play. Game and body-part vocabulary used in full sentences." },
          reading: { l: "“identify how health information can be used” (F); “explain why health information is important” (Yrs 1–2).", s: "Read-aloud of simple health messages with why-questions." },
          writing: { l: "Not in the achievement standard.", gap: true, s: "Topic words displayed and spelt correctly where students do write." } },
        developing: {
          sl: { l: "Discussing protective behaviours (Yrs 3–4); proposing strategies for respect and inclusion, and describing team contributions (Yrs 5–6).", s: "Team debriefs using the discussion stems. Students explain a tactic aloud." },
          reading: { l: "“interpret health information” (Yrs 3–4) building to “analyse health information” (Yrs 5–6).", s: "Teach how a health information text is organised. Use the before/during/after routine." },
          writing: { l: "Written or oral strategy proposals (Yrs 5–6).", s: "A one-paragraph strategy proposal written as a TEEL paragraph." } },
        consolidating: {
          sl: { l: "Sustained analytical discussion; negotiating and giving feedback in movement roles (Yrs 7–8).", s: "Structured peer feedback with sentence stems. Students justify a position on a health issue aloud." },
          reading: { l: "“analyse health information and messages” (Yrs 7–8).", s: "Take apart a media health message: its purpose, audience and reliability." },
          writing: { l: "Proposing strategies in writing after critical analysis (Yrs 7–8).", s: "An outlined strategy proposal; *because / but / so* on health content." } },
        extending: {
          sl: { l: "Oral leadership and structured feedback (Yrs 9–10).", s: "Students lead a warm-up or coach peers, using a structured feedback model." },
          reading: { l: "“synthesise health information from credible sources” (Yrs 9–10).", s: "Evaluate a source's credibility (author, evidence, purpose) before using it." },
          writing: { l: "“propose and justify strategies” (Yrs 9–10).", s: "A multi-paragraph justified proposal that cites its sources." } }
      },
      technologies: {
        foundational: {
          sl: { l: "Design and Technologies: “create, communicate and choose design ideas”.", s: "Students explain their design idea in full sentences (“My design will… because…”)." },
          reading: { l: "“follow sequenced steps”; follow basic algorithms (Yrs 1–2).", s: "Read and follow picture-and-word procedures, then retell the steps in order." },
          writing: { l: "“describe the purpose of familiar products”; communicate ideas through drawings (Yrs 1–2).", s: "Labelled drawings with sentence-frame captions." } },
        developing: {
          sl: { l: "“communicate design ideas to an audience using technical terms” (Yrs 5–6).", s: "A short design pitch using the shared presentation structure." },
          reading: { l: "Branching and iterative procedures (Yrs 3–4); interpreting user stories (Yrs 5–6).", s: "Explicitly teach the structure of a procedure. Students read user stories to identify what users need." },
          writing: { l: "Annotations and symbols (Yrs 3–4); “select and justify design ideas… against design criteria” (Yrs 5–6).", s: "A TEEL justification paragraph: my design (topic), why it works (explanation), the criteria it meets (evidence), link back to the brief." } },
        consolidating: {
          sl: { l: "Communicating design ideas “to audiences using technical terms” (Yrs 7–8).", s: "Design review sessions using paraphrase-and-question stems." },
          reading: { l: "Inferred: evaluating user stories and design criteria (Yrs 7–8).", gap: true, s: "Explicitly teach how to read design briefs, specifications and technical manuals." },
          writing: { l: "“explain how people design… for preferred futures”; “justify their decisions against developed design criteria” (Yrs 7–8).", s: "Outlines for folio evaluations; sentence strategies used in written justifications." } },
        extending: {
          sl: { l: "Communicating “to a range of audiences, including using digital tools” (Yrs 9–10).", s: "A client-style presentation of the final solution." },
          reading: { l: "Digital Technologies: “critically evaluate alternative solutions against stakeholder elicited user stories” (Yrs 9–10).", s: "Compare stakeholder requirements against technical documentation." },
          writing: { l: "Discursive writing on innovation and emerging technologies (Yrs 9–10).", s: "An outlined, multi-paragraph evaluative report with a revision step." } }
      }
    },
    details: {
      "foundational.sl": {
        subElements: ["Listening", "Interacting", "Speaking"],
        lookFors: ["Retells a set of instructions in order before starting the task.", "Answers in a full sentence without being prompted (“A mammal is an animal that…”).", "Uses this unit's topic words correctly when speaking."],
        ideas: [
          { t: "Say it back", d: "Give instructions once, then ask one student to retell them in order before anyone starts. Praise an accurate retell, not a fast one." },
          { t: "Words of the unit", d: "Choose 3–5 topic words. Say it, show it, use it in a sentence, then students use it in a sentence to a partner. Keep the words on display all unit." },
          { t: "Stem sentences", d: "Post the full-sentence frame for the lesson's key answer and expect it in every response (“Plants need ___ because ___”)." },
          { t: "Talk partners", d: "Fixed partners with a modelled routine: one speaks, one listens and repeats back, then swap." }
        ],
        example: { t: "Turning a one-word answer into a sentence", lines: ["Teacher: What do koalas eat?", "Student: Leaves.", "Teacher: Say it as a full sentence, using our word.", "Student: Koalas eat eucalyptus leaves."] },
        routines: ["retell", "topic-words", "full-sentence", "discussion-stems"]
      },
      "foundational.reading": {
        subElements: ["Phonological awareness", "Phonic knowledge and word recognition", "Fluency", "Understanding texts"],
        lookFors: ["Reads an unfamiliar regular word by blending its sounds, not by guessing from the picture.", "Reads common irregular words on sight.", "Reads a Year 2 passage aloud smoothly, with phrasing that sounds like talking."],
        ideas: [
          { t: "Daily phonics lesson (class teacher)", d: "Review known sounds, teach one new correspondence, practise blending and segmenting, then read a short text that uses only the code taught so far." },
          { t: "Matched practice texts", d: "Early practice texts use only taught letter–sound patterns, so students decode rather than guess." },
          { t: "Repeated reading", d: "Teacher models a short passage, students echo it, then partner-read the same passage three times, aiming for smoothness rather than speed." },
          { t: "Specialist teachers: read aloud", d: "In other learning areas, read short topic texts aloud with planned who/what/why questions, and decode the unit's topic words together." }
        ],
        example: { t: "Reading a new word", lines: ["Point to each sound: /sh/ /i/ /p/.", "Blend the sounds: ship.", "Reread the sentence: does it make sense?"] },
        tier: "Below benchmark on the decoding or fluency check at the end of Year 2 → refer for **Tier 2** support.",
        routines: ["phonics", "fluency", "topic-words"]
      },
      "foundational.writing": {
        subElements: ["Handwriting and keyboarding", "Spelling", "Punctuation", "Grammar", "Creating texts"],
        lookFors: ["Letters are correctly formed, sized and spaced.", "Every sentence starts with a capital letter and ends with a full stop.", "Taught spelling patterns and high-frequency words are correct in independent writing."],
        ideas: [
          { t: "Little and often handwriting", d: "Short daily practice using one school letter-formation model. Correct formation before speed." },
          { t: "Say it, then write it", d: "Student says the sentence aloud, counts the words on their fingers, writes it, then rereads it to check." },
          { t: "Join two sentences", d: "Give two simple sentences on the same topic and join them with *and*, *but* or *so*." },
          { t: "Same words everywhere", d: "Every teacher uses the same terms: sentence, capital letter, full stop, joining word." }
        ],
        example: { t: "From two simple sentences to one compound sentence", lines: ["The kookaburra laughed. The kookaburra flew to the gum tree.", "→ The kookaburra laughed and flew to the gum tree."] },
        routines: ["oral-rehearsal", "correction-codes"]
      },
      "developing.sl": {
        subElements: ["Listening", "Interacting", "Speaking"],
        lookFors: ["Uses a discussion stem to build on or question another student's idea.", "Gives a planned presentation with a clear beginning, middle and end.", "Uses subject vocabulary accurately when speaking."],
        ideas: [
          { t: "Stems on every wall", d: "The same discussion stems are displayed and expected in every classroom, so students meet one language for discussion all day." },
          { t: "Think, pair, share with a stem", d: "Silent think time, partner talk using a named stem, then two or three pairs share with the class." },
          { t: "A presentation outside English", d: "One planned presentation a term in another learning area, using the shared structure (hook, three points, conclusion) and the shared speaking rubric." },
          { t: "Listen and note", d: "During a video or explanation, students record the main idea and three key details on a shared note-taking scaffold." }
        ],
        example: { t: "Whole-school discussion stems", lines: ["I agree with ___ because…", "I'd like to add to what ___ said…", "Can you explain what you mean by…?", "I see it differently because…"] },
        routines: ["discussion-stems", "presentation", "topic-words"]
      },
      "developing.reading": {
        subElements: ["Understanding texts", "Fluency", "Phonic knowledge and word recognition"],
        lookFors: ["States the main idea of an informative text in one sentence.", "Points to the detail, table or diagram that supports an inference.", "Explains how the text is organised (headings, topic sentences, diagrams)."],
        ideas: [
          { t: "Show the structure first", d: "Before reading, walk through the headings, topic sentences and diagrams, and ask “What will this section tell us?”" },
          { t: "Before, during, after", d: "Before: predict from the structure. During: stop at each heading and summarise. After: answer the question you set at the start." },
          { t: "Teach the words, including their parts", d: "Pre-teach 5–8 key words, including prefixes, roots and suffixes (*photo-* means light; *-synthesis* means putting together)." },
          { t: "Read the visuals", d: "Treat tables, maps and diagrams as text. Ask: what does this show that the words don't?" }
        ],
        example: { t: "Main-idea sentence frame", lines: ["This section explains ___.", "The most important detail is ___ because ___.", "The diagram shows ___."] },
        tier: "Students not reading fluently by the end of **Year 4** → refer for **Tier 2** support. Decoding is not re-taught in other subjects.",
        routines: ["text-structure", "bda", "topic-words"]
      },
      "developing.writing": {
        subElements: ["Creating texts", "Grammar", "Spelling", "Punctuation"],
        lookFors: ["Opens with a topic sentence that says what the paragraph is about.", "Explains the point, then backs it with relevant evidence or an example.", "Links back to the topic or question, and uses more than one type of sentence."],
        ideas: [
          { t: "TEEL in every subject", d: "Topic sentence, Explanation, Evidence, Link. Same names, same expectations in Science, HASS, HPE and Technologies." },
          { t: "Model, guide, release", d: "Teacher writes a paragraph while thinking aloud; the class writes one together; students write their own." },
          { t: "Name the genre", d: "Every writing task says what it is (“This is an explanation”) and shows its structure before students start." },
          { t: "Sentence combining with real content", d: "Give two or three short sentences from the unit and ask students to combine them into one longer, accurate sentence." }
        ],
        example: { t: "A Year 6 HASS TEEL paragraph", lines: ["**Topic sentence:** Defence was one reason the Australian colonies federated in 1901.", "**Explanation:** Each colony had only a small defence force of its own, and many colonists feared invasion.", "**Evidence:** In 1889 a review of colonial defences recommended combining the colonies' forces into one.", "**Link:** A united nation could organise one defence force for the whole continent, so defence helped bring about Federation."] },
        routines: ["paragraph", "sentence-strategies", "correction-codes"]
      },
      "consolidating.sl": {
        subElements: ["Speaking", "Interacting"],
        lookFors: ["States a position, then gives a reason and evidence for it.", "Uses subject vocabulary instead of everyday words.", "Paraphrases another student's point before responding to it."],
        ideas: [
          { t: "Say it before you write it", d: "Two minutes of partner talk rehearsing the claim and evidence before any extended writing." },
          { t: "Sentence strategies out loud", d: "Run *because / but / so* as a fast oral starter on the lesson's content before anyone writes." },
          { t: "Paraphrase before you respond", d: "In debate or discussion, students must restate the previous speaker's point accurately before adding their own." },
          { t: "Upgrade the language", d: "Students restate an everyday answer in subject vocabulary (“it gets hotter” → “the temperature increases”)." }
        ],
        example: { t: "Oral justification frame", lines: ["I think ___ because ___.", "The evidence for this is ___.", "This shows that ___."] },
        routines: ["oral-rehearsal", "sentence-strategies", "discussion-stems"]
      },
      "consolidating.reading": {
        subElements: ["Understanding texts"],
        lookFors: ["Names the text type and its purpose (“This is a method; it tells me how to repeat the experiment”).", "Finds key information using the text's structure.", "Answers *because / but / so* prompts accurately from the text."],
        ideas: [
          { t: "Each faculty teaches its own text types", d: "Science teaches the method and the results table; History the source; Geography the data display; Mathematics the worded problem. Show the structure explicitly; don't assume English has done it." },
          { t: "Because / but / so as a comprehension check", d: "Give a sentence stem from the reading and ask for all three endings. Students can only complete them if they understood the text." },
          { t: "Shared source questions", d: "Humanities and Science use the same three questions for any source: Who made it? Why? What evidence does it use?" },
          { t: "Vocabulary in the unit plan", d: "Each unit plan names its key subject words and general academic words, and when each will be taught." }
        ],
        example: { t: "Because / but / so on a Year 9 History reading", lines: ["In 1916 Australians voted against conscription **because** many opposed forcing men to fight overseas.", "In 1916 Australians voted against conscription, **but** the result was close.", "In 1916 Australians voted against conscription, **so** the Australian Imperial Force stayed an all-volunteer army."] },
        tier: "Years 7–8 close the explicit reading period. Below expectation in **Year 7 NAPLAN Reading** → refer for **Tier 2** support.",
        routines: ["text-structure", "sentence-strategies", "source-questions", "topic-words"]
      },
      "consolidating.writing": {
        subElements: ["Creating texts", "Grammar", "Punctuation", "Spelling"],
        lookFors: ["Plans with an outline before drafting.", "Each body paragraph makes a claim, gives evidence and explains how the evidence supports it.", "Sentences are complete, varied (subordinating conjunctions, appositives) and accurately punctuated."],
        ideas: [
          { t: "Outline before drafting", d: "Year 7: a single-paragraph outline (topic sentence, points in note form, concluding sentence). Years 8–9: a multiple-paragraph outline with a thesis and one outlined paragraph per point." },
          { t: "Claim, evidence, reasoning", d: "Each body paragraph states a claim, gives evidence and explains how the evidence supports the claim. Same structure in Science, Humanities and English." },
          { t: "Five-minute sentence starters", d: "Open lessons with one sentence strategy applied to today's content: *because / but / so*, a subordinating conjunction, an appositive or sentence combining." },
          { t: "Same correction codes", d: "All faculties mark the same small set of high-frequency errors with the same codes, so students fix them the same way everywhere." }
        ],
        example: { t: "Sentence strategies in Science", lines: ["**Subordinating conjunction:** Although the plant received water, it wilted because it had no sunlight.", "**Appositive:** Chlorophyll, the green pigment in leaves, absorbs light energy.", "**Expanded sentence:** Plants make glucose *in their leaves* (where) *during the day* (when) *using light energy* (how)."] },
        routines: ["outlines", "cer", "sentence-strategies", "correction-codes", "revision"]
      },
      "extending.sl": {
        subElements: ["Speaking", "Interacting"],
        lookFors: ["Sustains an argument with a clear structure for several minutes.", "Adjusts vocabulary and register to suit the audience.", "Answers questions or counter-arguments with evidence."],
        ideas: [
          { t: "An assessed oral outside English", d: "At least one assessed oral task a year in another subject, using the shared oral rubric." },
          { t: "Seminar with prepared positions", d: "Students arrive with a position and evidence cards. Discussion moves are scored, not just contributions." },
          { t: "Audience switch", d: "Students present the same finding to an expert audience and to a non-specialist one, then discuss what changed and why." }
        ],
        example: { t: "Seminar moves", lines: ["Building on ___'s point…", "The evidence for that is limited because…", "If we accept that, then it follows that…", "Where we actually disagree is…"] },
        routines: ["presentation", "discussion-stems"]
      },
      "extending.reading": {
        subElements: ["Understanding texts"],
        lookFors: ["Summarises a complex text's argument and evidence accurately.", "Judges how strong the evidence behind a claim is.", "Explains how language choices position the reader."],
        ideas: [
          { t: "Paired texts that disagree", d: "Two texts on the same issue with different conclusions. Students decide which case is stronger and justify the judgement." },
          { t: "Claim tracker", d: "A four-column organiser: the claim, the evidence, how strong the evidence is, and who benefits if the claim is believed." },
          { t: "Spot the positioning", d: "Students highlight loaded words in a text, rewrite the passage neutrally, and explain what changed." }
        ],
        example: { t: "Paired reading in Science", lines: ["Text A: a research summary on coral bleaching on the Great Barrier Reef.", "Text B: a news report of the same research.", "Question: Does the headline claim more than the research found? Quote both texts in your answer."] },
        routines: ["paired-texts", "source-questions"]
      },
      "extending.writing": {
        subElements: ["Creating texts", "Grammar", "Punctuation", "Spelling"],
        lookFors: ["The thesis is clear and every paragraph serves it.", "Evidence from several sources is brought together, not just listed.", "Revision is visible: combined sentences, precise words, transitions that show how ideas connect."],
        ideas: [
          { t: "Multiple-paragraph outline with a thesis", d: "Every extended response is planned with an outline built around a one-sentence thesis." },
          { t: "Take apart a model answer", d: "Students annotate a strong answer against the outline structure to see how an expert writer in the subject builds an argument." },
          { t: "Revision as its own lesson step", d: "After drafting: combine choppy sentences, expand vague ones, add transitions. Then edit with the shared checklist." },
          { t: "Teach the subject's referencing", d: "Each faculty teaches its own citation and referencing conventions explicitly." }
        ],
        example: { t: "Transition words by purpose", lines: ["**Time:** subsequently, meanwhile, previously", "**Illustration:** for instance, in particular, specifically", "**Change of direction:** however, conversely, nevertheless", "**Conclusion:** therefore, consequently, as a result"] },
        routines: ["outlines", "revision", "sentence-strategies"]
      }
    }
  },

  numeracy: {
    id: "numeracy",
    name: "Numeracy",
    lead: "Mathematics",
    leadWho: "Taught by the Junior School class teacher in Mathematics time (P–6) and by the Mathematics faculty (7–10).",
    definition: "The capacity to recognise, select, apply, interpret and evaluate mathematical ideas, representations and tools in authentic contexts.",
    plain: "A boy's capacity to recognise, use and reason with mathematical ideas in real situations — not only in the mathematics classroom, but wherever number, measurement, data and pattern genuinely appear.",
    challenge: "Numeracy's challenge is **visibility**: making sure mathematics students already know is noticed and applied in other subjects, not re-taught. Mathematics owns fluency. Other subjects **identify** the maths, **check the prerequisite** and **model applying it**.",
    domains: [
      { id: "na", name: "Number and Algebra", plain: "Working confidently and flexibly with number.",
        def: "Understanding, representing and operating on quantities and their relationships, including pattern, structure and change.",
        parts: ["**Trusting the count and place value** — from counting by ones to a structured understanding of number.", "**Multiplicative thinking** — beyond repeated addition to proportional and relational reasoning.", "**Partitioning and proportional reasoning** — the foundation for fractions, ratio, rate and algebra."] },
      { id: "mg", name: "Measurement and Geometry", plain: "Measuring, and reasoning about shape and space.",
        def: "Quantifying and comparing attributes such as length, area, volume and time, and reasoning about shape and space.",
        parts: ["**Geometric reasoning** — from recognising shapes, to describing their properties, to informal and formal deduction.", "**Measurement sense** — estimating, choosing units and tools, and judging precision."] },
      { id: "sp", name: "Statistics and Probability", plain: "Making sense of data, chance and uncertainty.",
        def: "Collecting, representing and interpreting data, and reasoning about chance to make and evaluate evidence-based claims.",
        parts: ["**Statistical literacy** — interpreting statistics in context and questioning statistical claims.", "**Probabilistic reasoning** — from everyday judgements about chance to formal likelihood."] }
    ],
    focus: {
      foundational: { na: "Trusting the count and early place value through counting and quantity.", mg: "Informal measurement and shape recognition through play and routine.", sp: "Simple data collection and everyday chance language." },
      developing: { na: "Additive and early multiplicative strategies; money, time and fractions.", mg: "Formal units, estimation and geometric properties across subjects.", sp: "Representing and interpreting simple data displays and chance events." },
      consolidating: { na: "Multiplicative and proportional reasoning; ratio, rate and early algebra.", mg: "Scale, measurement accuracy and geometric reasoning in authentic tasks.", sp: "Statistical investigation and probability across subject contexts." },
      extending: { na: "Financial, algebraic and functional reasoning in real-world modelling.", mg: "Applied measurement, trigonometry and spatial reasoning in context.", sp: "Critical evaluation of statistical claims and models; formal probability." }
    },
    targets: {
      foundational: { na: "Trust the count, and use place value and additive strategies (not counting by ones) with numbers into the hundreds.", mg: "Measure and compare using uniform informal units, and describe shape and position with correct language.", sp: "Collect, represent and describe simple data, and use everyday chance language." },
      developing: { na: "Use multiplicative strategies and connect fractions, decimals and percentages, including in money problems.", mg: "Choose a suitable formal unit and instrument, estimate, measure accurately and record the result with its unit.", sp: "Collect data, choose a suitable display, and interpret what it shows." },
      consolidating: { na: "Recognise and solve proportional situations (ratio, rate, percentage, scale), and substitute into and rearrange formulas.", mg: "Use scale, and calculate lengths, areas and volumes in practical contexts with appropriate accuracy.", sp: "Carry out a statistical investigation and draw a conclusion, noting its limits." },
      extending: { na: "Model real situations, including financial ones, with algebraic relationships, and judge whether the model is reasonable.", mg: "Apply measurement, Pythagoras' theorem and trigonometry to practical problems, stating the precision of the answer.", sp: "Critically evaluate statistical claims, and use formal probability to reason about risk." }
    },
    measure: {
      foundational: "Early-number assessment (interview or PAT-M) **[audit]**",
      developing: "NAPLAN Years 3 and 5; PAT-M",
      consolidating: "NAPLAN Years 7 and 9; PAT-M",
      extending: "Faculty assessment; PAT-M if run in Year 10 **[audit]**"
    },
    method: {
      foundational: { na: "Daily counting and subitising routines. Place value taught with concrete materials before symbols. Additive strategies (counting on, doubles, bridging to ten) named, modelled and practised.", mg: "Hands-on comparison and measurement with uniform informal units, with explicit discussion of why units must be the same size. Shape and position vocabulary taught explicitly.", sp: "Class questions answered with tallies and picture graphs. Chance talk (will, might, won't) during stories and games." },
      developing: { na: "Multiplicative strategies taught explicitly (arrays, partitioning, doubling and halving), with daily fact-fluency practice. Number lines and area models as the shared representations for fractions, decimals and percentages.", mg: "Estimate, then measure, then check. Formal units and instruments, metric conversion and 12/24-hour time taught explicitly. Shapes classified by their properties.", sp: "Investigations with student-chosen displays. Graph conventions (title, axes, scale) taught as the school standard that all subjects use. Chance experiments compared with expected results." },
      consolidating: { na: "Proportional reasoning taught explicitly, with students asked whether a situation is additive or multiplicative. Algebra practised on formulas taken from Science, Geography and Technologies.", mg: "Area, volume and scale taught with stated degrees of accuracy. Pythagoras' theorem and geometric reasoning set in practical problems.", sp: "A shared investigation cycle: question, collect, represent, analyse, conclude. Students summarise data (mean, median, range), discuss bias and sample size, and work with compound probability." },
      extending: { na: "Financial mathematics (percentage change, interest) and modelling with linear and non-linear functions. Students interpret rate of change.", mg: "Trigonometry and surface area and volume applied to real contexts. Precision and error stated explicitly.", sp: "Critiquing published statistics (sampling, misleading graphs, correlation versus causation). Formal probability, including independence." }
    },
    acrossSubjects: {
      foundational: "Numeracy is present but embedded in play, routine and informal activity — easily unnoticed as mathematics.",
      developing: "Numeracy opportunities become identifiable (money, time, simple data) but are not always made explicit outside Mathematics.",
      consolidating: "Subjects increasingly assume specific numeracy prerequisites (ratio, scale) without checking students have them.",
      extending: "Numeracy is applied to genuine disciplinary problems — modelling, evaluating data, financial reasoning — and needs explicit identification rather than incidental use."
    },
    pedagogy: [
      { el: "Identifying opportunity", how: "Naming, in plain language, the mathematics already present in a task (“this is a rate”, “this is proportional reasoning”)." },
      { el: "Checking prerequisites", how: "A brief check, before the unit begins, of the specific numeracy skill the unit assumes." },
      { el: "Applying with confidence", how: "Explicit modelling of how to use the mathematical tool in this subject's own context, rather than assuming it transfers automatically from Mathematics." }
    ],
    subjectCells: {
      science: {
        foundational: {
          na: { l: "Not in the achievement standard.", gap: true, s: "Count and compare quantities in observations (“How many legs? Which has more?”)." },
          mg: { l: "Not in the achievement standard (measurement starts in Year 3).", gap: true, s: "Informal comparisons (longer, heavier, holds more) using Mathematics' language." },
          sp: { l: "“represent observations and identify patterns” (F); “use provided tables and organisers” (Yrs 1–2).", s: "Tallies and picture graphs of observations, using Mathematics' conventions." } },
        developing: {
          na: { l: "Not in the achievement standard.", gap: true, s: "Name the operation when totalling or averaging results. Check decimal skills before measuring in decimal units." },
          mg: { l: "“familiar classroom instruments” (Yr 3); “accurate formal measurements” (Yr 4); “appropriate precision” (Yr 5); controlled variables (Yr 6).", s: "Estimate before measuring. “No unit, no mark.” Check that students can read the instrument's scale before the practical." },
          sp: { l: "“construct representations to organise data” (Yr 4); patterns and trends (Yr 5); sources of error (Yr 6).", s: "Graphs use the school standard (title, labelled axes, scale). Students choose a display and justify it." } },
        consolidating: {
          na: { l: "Barely in the achievement standard, but formulas and rates appear throughout the content.", gap: true, s: "Name each rate and ratio (speed, concentration, density). Check substitution and rearranging before the unit. This is the main unchecked prerequisite in Science." },
          mg: { l: "“generate and record data with precision” (Yrs 7–8); “replicable data with precision” (Yr 9).", s: "State the required accuracy for each task. Students repeat trials and average them." },
          sp: { l: "“analyse… patterns, trends and relationships” (Yr 7); “identify anomalies” (Yr 8); “summarise data” (Yr 9).", s: "Use the shared investigation cycle. Means and outliers are calculated with Mathematics' methods." } },
        extending: {
          na: { l: "Weak: “apply Newton's laws… to predict motion” (Yr 10).", gap: true, s: "Treat graphs and formulas as models, and interpret the gradient as a rate." },
          mg: { l: "“appropriate sample sizes and replicable data with precision” (Yr 10).", s: "Report measurement uncertainty, and justify the sample size chosen." },
          sp: { l: "“evaluate the validity and reproducibility of methods” (Yr 10).", s: "Critique a data claim for sample, controls and correlation versus causation. Name probability where it appears in content (for example, inheritance)." } }
      },
      humanities: {
        foundational: {
          na: { l: "Not in the achievement standard.", gap: true, s: "Count in time (days, years ago) on simple timelines." },
          mg: { l: "Places can be “spatially represented” (F, Yr 2).", s: "Position language, and simple maps of the classroom and school." },
          sp: { l: "“collect, sort and record… data” (Yr 2).", s: "Class survey shown as a picture graph." } },
        developing: {
          na: { l: "Resources and allocation (Yrs 4–5); “informed consumer and financial choices” (Yr 6).", s: "Budget and best-buy tasks. Check percentage and decimal skills first." },
          mg: { l: "Representing places and comparing “across scales” (Yr 3). Not in the achievement standard for Yrs 5–6.", s: "Treat grid references and map scale as maths, and use Mathematics' terms." },
          sp: { l: "“interpret information and data in different formats” (Yr 3) building to “patterns, trends or inferred relationships” (Yr 6).", s: "Read graphs using the school's graph conventions, and describe trends in a full sentence." } },
        consolidating: {
          na: { l: "Economics and Business: costs and benefits (Yr 7), taxation and budgeting (Yr 8), financial risks and rewards (Yr 9).", s: "Name the percentage and rate calculations involved. Check them before Economics and Business units." },
          mg: { l: "Barely in the achievement standard (Yr 9: distribution of biomes across scale).", gap: true, s: "Treat map scale as a ratio, and check proportional reasoning before Geography fieldwork." },
          sp: { l: "Geography: “collect, organise and represent relevant data”, “describe the features of a distribution”, infer relationships (Yrs 7–9).", s: "Use the shared investigation cycle. Fieldwork data is summarised with mean and range." } },
        extending: {
          na: { l: "Economics and Business: “how economic indicators influence decision-making”; superannuation (Yr 10).", s: "Percentage change and compound interest, checked before the unit." },
          mg: { l: "Geography: interactions “at different scales” (Yr 10).", s: "Calculate distance and area from maps during fieldwork." },
          sp: { l: "“make generalisations and predictions”; “evaluate trends” (Yr 10).", s: "Critique a media data claim for bias and misleading graphs." } }
      },
      hpe: {
        foundational: {
          na: { l: "Not in the achievement standard.", gap: true, s: "Count scores, laps and repetitions aloud." },
          mg: { l: "“manipulate objects and space” (F).", s: "Position and direction language used deliberately (over, under, left, right)." },
          sp: { l: "Not in the achievement standard.", gap: true, s: "Simple tallies of game results." } },
        developing: {
          na: { l: "Not in the achievement standard.", gap: true, s: "Total and compare scores, and name the operation used." },
          mg: { l: "“movement concepts” (Yrs 3–4); “apply movement concepts” (Yrs 5–6).", s: "Measure distances and times in athletics, always recorded with units." },
          sp: { l: "Emerging: “evaluate the impact on movement outcomes” (Yrs 5–6).", s: "Students record their own performance and compare it with an earlier attempt." } },
        consolidating: {
          na: { l: "Not in the achievement standard.", gap: true, s: "Heart rate as a rate, and percentage of maximum heart rate. Name the rate and the percentage, and check them first." },
          mg: { l: "“evaluate the effectiveness of movement strategies” (Yrs 7–8).", s: "Pacing (distance ÷ time) and use of space in tactics." },
          sp: { l: "Implicit: tracking progress towards fitness outcomes (Yrs 7–8).", s: "Graph personal fitness data over a unit, using the school's graph conventions." } },
        extending: {
          na: { l: "Not in the achievement standard.", gap: true, s: "Training-load and nutrition calculations (ratios, percentages)." },
          mg: { l: "Not distinctly named (Yrs 9–10).", gap: true, s: "Precise timing and measurement in performance analysis." },
          sp: { l: "Inferred: evaluating self and peer performance (Yrs 9–10).", s: "Evaluate fitness-test data trends. Discuss chance and risk in sport and health decisions." } }
      },
      technologies: {
        foundational: {
          na: { l: "Not in the achievement standard.", gap: true, s: "Count and sort materials." },
          mg: { l: "Not in the achievement standard (sequencing only).", gap: true, s: "Informal measuring when making (longer, shorter, fits), using Mathematics' language." },
          sp: { l: "Digital Technologies: “represent data using objects, pictures and symbols” (F); “represent and process data in different ways” (Yrs 1–2).", s: "Picture graphs and sorting activities linked to Mathematics." } },
        developing: {
          na: { l: "Digital Technologies: algorithms “including variables” (Yrs 5–6).", s: "Name the variable as a quantity that changes, and connect it to number patterns." },
          mg: { l: "Design and Technologies: “plan and sequence steps” (Yrs 3–4), “develop project plans” (Yrs 5–6). No measurement wording.", gap: true, s: "Measure with formal units, check ruler skills first, and label diagrams with units." },
          sp: { l: "“process and represent data for different purposes” (Yrs 3–4); “show how digital systems represent data” (Yrs 5–6).", s: "Data displays use the school's graph conventions." } },
        consolidating: {
          na: { l: "Digital Technologies: “represent data with integers and binary” (Yrs 7–8).", s: "Link binary to place value. Use formulas in spreadsheets and name the algebra involved." },
          mg: { l: "Not in Design and Technologies' standard (Yrs 7–8).", gap: true, s: "Scale drawings and material quantities. Name the scale as a ratio and check it before the unit." },
          sp: { l: "Digital Technologies: “acquire, interpret and model data with spreadsheets” (Yrs 7–8).", s: "Spreadsheet modelling using Mathematics' statistics terms (mean, range)." } },
        extending: {
          na: { l: "Digital Technologies: “design and validate algorithms” (Yrs 9–10).", s: "Test validation logically with boundary values and expected outputs." },
          mg: { l: "Not in Design and Technologies' standard (Yrs 9–10).", gap: true, s: "Tolerances, precision and trigonometry in technical drawings." },
          sp: { l: "Digital Technologies: “acquire, interpret and model complex data with databases” (Yrs 9–10).", s: "Query and evaluate datasets, critiquing the conclusions drawn from them." } }
      }
    },
    details: {
      "foundational.na": {
        subElements: ["Number and place value", "Counting processes", "Additive strategies"],
        lookFors: ["Counts a collection once and says how many without recounting.", "Partitions two- and three-digit numbers into hundreds, tens and ones.", "Adds by counting on or making ten, not by counting everything from one."],
        ideas: [
          { t: "Daily counting and subitising warm-up", d: "Flash dot cards and ten-frames: “How many? How do you know without counting?”" },
          { t: "Concrete before symbols", d: "Bundle sticks into tens, use base-ten blocks, and only then write the numeral." },
          { t: "Name the strategy", d: "Students say how they solved it: “I made ten”, “I counted on from the bigger number”, “I used a double”." },
          { t: "Other learning areas", d: "Count and compare quantities in everyday routines: “How many more balls do we need for every team?”" }
        ],
        example: { t: "Making ten: 8 + 5", lines: ["8 needs 2 more to make 10.", "Split 5 into 2 and 3.", "8 + 2 = 10, then 10 + 3 = 13."] },
        tier: "*Proposed:* not yet trusting the count, or still counting by ones, on the early-number assessment at the end of Year 2 → refer for **Tier 2** support.",
        routines: ["identify-check-apply"]
      },
      "foundational.mg": {
        subElements: ["Understanding units of measurement", "Understanding geometric properties", "Positioning and locating", "Measuring time"],
        lookFors: ["Uses the same-sized unit repeatedly, with no gaps or overlaps.", "Describes shapes by their features (sides, corners, faces).", "Gives and follows directions using position words."],
        ideas: [
          { t: "Why must units match?", d: "Several students measure the same desk in hand spans and get different answers. Discuss why, then measure with identical blocks." },
          { t: "Shape hunt with feature talk", d: "Find shapes around the school and describe them: “It has four straight sides and four corners.”" },
          { t: "Position games in HPE", d: "“Stand behind the cone, move to the left of the hoop” — the same position words as Mathematics." },
          { t: "Time in the daily routine", d: "Talk through the timetable and calendar each morning using the time language taught in Mathematics." }
        ],
        example: { t: "Recording an informal measurement", lines: ["The table is 9 pencils long.", "I put the pencils end to end with no gaps."] },
        routines: ["identify-check-apply", "no-unit"]
      },
      "foundational.sp": {
        subElements: ["Interpreting and representing data", "Understanding chance"],
        lookFors: ["Collects data with tallies or objects.", "Makes a picture or column graph and says what it shows.", "Uses *will happen*, *might happen* and *won't happen* correctly."],
        ideas: [
          { t: "Question of the week", d: "A class question (favourite fruit, how we got to school), tallied, then shown as a picture graph." },
          { t: "Read the graph", d: "“Which has the most? How many more chose apples than bananas?”" },
          { t: "Chance talk", d: "During stories and games: “Will it happen, might it happen, or won't it happen?”" }
        ],
        example: { t: "From tally to sentence", lines: ["Walk: |||| ||   Car: |||| |||| |   Bus: |||", "More of us came by car than any other way.", "Four more came by car than walked."] },
        note: "Chance has no AC:Mathematics anchor before Year 3 in the workbook. It is included because Framework Table 6 names it.",
        routines: ["graph-conventions"]
      },
      "developing.na": {
        subElements: ["Multiplicative strategies", "Interpreting fractions", "Proportional thinking", "Understanding money", "Additive strategies"],
        lookFors: ["Uses arrays, known facts or partitioning to multiply, rather than repeated addition.", "Moves between fractions, decimals and percentages (½ = 0.5 = 50%).", "Solves a best-buy or budget problem and explains the strategy."],
        ideas: [
          { t: "Daily fact fluency", d: "Short, cumulative fact practice in Mathematics, so working memory is free for problem solving everywhere else." },
          { t: "One set of representations", d: "Number lines and area models are the shared pictures for fractions, decimals and percentages in every class." },
          { t: "Additive or multiplicative?", d: "Before solving, students say which kind of situation it is and why." },
          { t: "Real money in HASS", d: "Budgets and best-buy tasks in consumer and financial units, with a quick percentage and decimal check first." }
        ],
        example: { t: "Best buy", lines: ["Option A: 3 pens for $4.50. Option B: $1.40 each.", "A: $4.50 ÷ 3 = $1.50 per pen.", "B is cheaper per pen, by 10 cents."] },
        tier: "*Proposed:* counting processes not secure in **Year 5 NAPLAN Numeracy** or PAT-M (they conclude by Year 5 in the progressions) → refer for **Tier 2** support.",
        routines: ["identify-check-apply", "additive-or-multiplicative"]
      },
      "developing.mg": {
        subElements: ["Understanding units of measurement", "Measuring time", "Understanding geometric properties", "Positioning and locating"],
        lookFors: ["Estimates before measuring, then checks the estimate.", "Chooses a suitable unit and instrument.", "Always writes the unit, and reads scales accurately."],
        ideas: [
          { t: "Estimate, measure, check", d: "Every measurement starts with an estimate, which is compared with the result afterwards." },
          { t: "No unit, no mark", d: "Applied the same way in Mathematics, Science, Technologies and HPE." },
          { t: "Scale-reading check before a practical", d: "Three quick readings from photos of the instrument (ruler, measuring cylinder, scales) before students use the real thing." },
          { t: "Real timetables", d: "Camps, sports carnivals and HPE use 24-hour time and real timetables, named as Mathematics." }
        ],
        example: { t: "Estimate, measure, check", lines: ["Estimate: 30 cm.", "Measured: 27.5 cm.", "My estimate was 2.5 cm too long."] },
        routines: ["no-unit", "identify-check-apply"]
      },
      "developing.sp": {
        subElements: ["Interpreting and representing data", "Understanding chance"],
        lookFors: ["Chooses a display that suits the data and can say why.", "Graphs have a title, labelled axes and an even scale.", "Describes a trend or pattern in a full sentence."],
        ideas: [
          { t: "One set of graph conventions", d: "The school's graph conventions are displayed and enforced in Mathematics, Science, HASS and Technologies." },
          { t: "Choose and justify", d: "Students choose between a column graph, line graph or table and write one sentence explaining the choice." },
          { t: "Describe the trend", d: "Sentence frame: “As ___ increases, ___ increases / decreases / stays the same.”" },
          { t: "Expected versus observed", d: "Predict a chance result, run the experiment, and explain the difference." }
        ],
        example: { t: "Describing a line graph", lines: ["As the time of day increased from 9 am to 1 pm, the temperature increased from 18 °C to 27 °C.", "After 1 pm the temperature began to fall."] },
        routines: ["graph-conventions", "investigation-cycle"]
      },
      "consolidating.na": {
        subElements: ["Proportional thinking", "Number patterns and algebraic thinking", "Number and place value", "Multiplicative strategies"],
        lookFors: ["Recognises a ratio, rate or percentage situation in a task outside Mathematics.", "Uses a multiplicative strategy where one is needed (scaling a recipe, map scale).", "Substitutes into and rearranges a formula from another subject."],
        ideas: [
          { t: "Name the maths", d: "Other subjects say it out loud: “This is a rate.” “This is a ratio.” “This is a formula you've rearranged in Maths.”" },
          { t: "Three-question prerequisite check", d: "Before a unit that uses a formula, three quick questions on substituting and rearranging. Students who struggle are supported before the content depends on it." },
          { t: "A shared formula bank", d: "Mathematics uses formulas taken from Science, Geography and Technologies when teaching algebra." },
          { t: "Additive or multiplicative?", d: "Before solving any proportion problem, students decide which kind of situation it is." }
        ],
        example: { t: "Rearranging a Science formula", lines: ["Speed = distance ÷ time, so s = d ÷ t.", "To find time: t = d ÷ s.", "A cyclist travels 24 km at 16 km/h: t = 24 ÷ 16 = 1.5 hours."] },
        tier: "*Proposed:* additive strategies or fractions not secure in **Year 7 NAPLAN Numeracy** (they conclude by Years 8 and 9) → refer for **Tier 2** support before proportional reasoning depends on them.",
        routines: ["identify-check-apply", "additive-or-multiplicative"]
      },
      "consolidating.mg": {
        subElements: ["Understanding units of measurement", "Understanding geometric properties"],
        lookFors: ["Converts between a map or drawing scale and real distances.", "Chooses the right formula for area or volume, and gives square or cubic units.", "States answers to a sensible degree of accuracy."],
        ideas: [
          { t: "State the accuracy", d: "Every measurement task says what degree of accuracy is expected (nearest mm, 2 decimal places, 3 significant figures)." },
          { t: "Scale is a ratio", d: "Geography and Technologies name map and drawing scales as ratios and use Mathematics' method to convert." },
          { t: "Repeat and average", d: "Science practicals repeat trials and average them, and discuss why." },
          { t: "Name the geometry", d: "Geography and Technologies point out the angle, similarity or Pythagoras' theorem inside their tasks." }
        ],
        example: { t: "Map scale", lines: ["Scale 1 : 50 000 means 1 cm on the map = 50 000 cm = 500 m.", "Two towns are 7.2 cm apart on the map.", "7.2 × 500 m = 3600 m = 3.6 km."] },
        routines: ["no-unit", "identify-check-apply"]
      },
      "consolidating.sp": {
        subElements: ["Interpreting and representing data", "Understanding chance"],
        lookFors: ["Follows the investigation cycle from question to conclusion.", "Summarises data with mean, median and range, and knows when each is the better choice.", "Names a limit of the conclusion (sample size, bias, an anomaly)."],
        ideas: [
          { t: "One investigation cycle", d: "Question, collect, represent, analyse, conclude — used identically in Mathematics, Science and Geography." },
          { t: "Which average?", d: "Give a data set with an outlier and ask whether the mean or median better represents it, and why." },
          { t: "Limits sentence", d: "Every conclusion ends with: “This conclusion is limited because…”" },
          { t: "Probability where it appears", d: "Sport, games and risk in Health are named as probability and use Mathematics' language." }
        ],
        example: { t: "Mean or median?", lines: ["Reaction times (s): 0.21, 0.24, 0.22, 0.25, 0.90", "Mean = 0.364 s; median = 0.24 s.", "The median is better: the 0.90 s result is an anomaly that pulls the mean up."] },
        routines: ["investigation-cycle", "graph-conventions"]
      },
      "extending.na": {
        subElements: ["Understanding money", "Number patterns and algebraic thinking", "Proportional thinking"],
        lookFors: ["Calculates percentage change and compound interest correctly.", "Builds or interprets a model (formula, table or graph) of a real situation.", "Judges whether a model's result is reasonable, and states its limits."],
        ideas: [
          { t: "Financial decisions with a prerequisite check", d: "Economics and Business checks percentage change and compound interest before financial units." },
          { t: "Gradient is a rate of change", d: "Science and Economics read the slope of a graph as a rate and say what it means in context." },
          { t: "Reasonableness check", d: "Every modelled answer is followed by: “Does this make sense here? When would this model stop working?”" }
        ],
        example: { t: "Compound interest", lines: ["$1000 invested at 5% per year, compounded annually, for 3 years.", "1000 × 1.05³ = $1157.63.", "Simple interest would give $1150, so compounding earned $7.63 more."] },
        routines: ["identify-check-apply"]
      },
      "extending.mg": {
        subElements: ["Understanding units of measurement", "Understanding geometric properties"],
        lookFors: ["Chooses Pythagoras' theorem or trigonometry correctly for a right-angled problem.", "Gives answers with sensible precision and states the uncertainty.", "Uses technical drawing conventions and scale accurately."],
        ideas: [
          { t: "Use Mathematics' method", d: "Technologies and Geography use the same trigonometry methods as Mathematics rather than a separate shortcut." },
          { t: "Report uncertainty", d: "Science results include an uncertainty and a comment on precision." },
          { t: "Tolerances", d: "Technologies sets and checks tolerances on manufactured parts, named as measurement precision." }
        ],
        example: { t: "Height of a tree", lines: ["You stand 20 m from the base; the angle of elevation to the top is 35°.", "height = 20 × tan 35° ≈ 14.0 m.", "State it as about 14 m: the angle was measured to the nearest degree."] },
        routines: ["identify-check-apply", "no-unit"]
      },
      "extending.sp": {
        subElements: ["Interpreting and representing data", "Understanding chance"],
        lookFors: ["Questions a statistical claim: its sample, source, display and whether it shows causation.", "Explains the difference between correlation and causation with an example.", "Uses probability language and calculations precisely when discussing risk."],
        ideas: [
          { t: "A shared data-claim checklist", d: "English, Humanities and Science critique at least one data-based claim a year with the same checklist." },
          { t: "Spot the misleading graph", d: "Truncated axes, uneven scales and cherry-picked time frames, compared with an honest version." },
          { t: "Risk in Health", d: "Two-way tables and conditional probability applied to a real health decision." }
        ],
        example: { t: "Correlation or causation?", lines: ["Claim: “Students who eat breakfast get better marks, so breakfast causes better marks.”", "Ask: How big was the sample? Who funded it?", "What else might explain both (sleep, routine, family support)?"] },
        routines: ["data-claim", "graph-conventions"]
      }
    }
  },

  routines: {
    "retell": { area: "literacy", t: "Say it back", stages: ["foundational", "developing"], who: "All teachers",
      what: "Instructions are given once, then retold by a student before anyone starts.",
      steps: ["Give the instructions once, clearly and in order.", "Ask one student to retell them in order.", "Correct or confirm, then start."],
      why: "Builds listening and checks understanding before students lose time on the wrong task." },
    "topic-words": { area: "literacy", t: "Words of the unit", stages: ["foundational", "developing", "consolidating", "extending"], who: "All teachers",
      what: "A small set of key words is chosen in the unit plan and taught explicitly, including their parts.",
      steps: ["Choose 3–5 words (P–2) or 5–8 words (3–10) in the unit plan.", "Say it, show it, explain it, including prefixes, roots and suffixes.", "Students use each word in a sentence of their own.", "Keep the words visible and expect them in answers all unit."],
      why: "Vocabulary is the strongest link between reading and understanding a subject." },
    "full-sentence": { area: "literacy", t: "Full-sentence answers", stages: ["foundational", "developing"], who: "All teachers",
      what: "Key answers are given as full sentences using a posted stem.",
      steps: ["Post the stem for the lesson's key answer.", "Model it.", "When a student answers in a word, ask for the full sentence."],
      why: "Oral sentences come before written ones." },
    "discussion-stems": { area: "literacy", t: "Whole-school discussion stems", stages: ["developing", "consolidating", "extending"], who: "All teachers",
      what: "One shared set of stems for agreeing, adding, questioning and disagreeing, displayed in every room.",
      steps: ["I agree with ___ because…", "I'd like to add to what ___ said…", "Can you explain what you mean by…?", "I see it differently because…", "From Year 7: paraphrase the previous point before you respond."],
      why: "Students meet one language for discussion across every subject.", status: "Final wording to be agreed" },
    "oral-rehearsal": { area: "literacy", t: "Say it before you write it", stages: ["foundational", "developing", "consolidating"], who: "All teachers",
      what: "Students say the sentence or argument aloud before writing it.",
      steps: ["P–2: say the sentence, count the words, write it, reread it.", "7–10: two minutes of partner talk rehearsing claim and evidence before extended writing.", "Sentence strategies are done aloud first, then in writing."],
      why: "If students can't say it, they can't write it." },
    "presentation": { area: "literacy", t: "Shared presentation structure and rubric", stages: ["developing", "consolidating", "extending"], who: "All teachers",
      what: "One structure and one speaking rubric for planned presentations in every subject.",
      steps: ["Hook.", "Three points, each with evidence or an example.", "Conclusion that answers the question.", "Assessed against the shared speaking rubric."],
      why: "Speaking and Listening has no standardised measure, so a shared rubric is how progress is seen.", status: "Rubrics to be written (P–2, 3–6, 7–10)" },
    "phonics": { area: "literacy", t: "Systematic phonics lesson", stages: ["foundational"], who: "Junior School class teacher",
      what: "A daily, sequenced lesson teaching letter–sound correspondences.",
      steps: ["Review known sounds.", "Teach one new correspondence.", "Blend and segment words with it.", "Read a short text that uses only the code taught so far."],
      why: "Word recognition is a constrained skill: it must be taught explicitly and secured early." },
    "fluency": { area: "literacy", t: "Modelled, repeated and partner reading", stages: ["foundational", "developing"], who: "Junior School class teacher",
      what: "Fluency built through hearing, echoing and rereading the same passage.",
      steps: ["Teacher models the passage.", "Students echo-read.", "Partners reread it three times, aiming for smoothness and phrasing."],
      why: "Fluent reading frees attention for comprehension." },
    "bda": { area: "literacy", t: "Before, during, after reading", stages: ["developing", "consolidating"], who: "All teachers",
      what: "A three-part routine for reading any informative text.",
      steps: ["**Before:** preview the structure (headings, visuals) and set a question.", "**During:** pause at each section and summarise in one sentence.", "**After:** answer the question you set, using evidence from the text."],
      why: "Gives every subject the same way into a text. It is the structure behind infographic #2." },
    "text-structure": { area: "literacy", t: "Show the structure first", stages: ["developing", "consolidating"], who: "All teachers",
      what: "Before reading, the teacher shows how this subject's text type is organised.",
      steps: ["Name the text type and its purpose.", "Point out how it is organised (headings, method steps, source details, data labels).", "Model finding one piece of key information using the structure."],
      why: "From Year 7, reading is disciplinary: each subject teaches its own texts." },
    "source-questions": { area: "literacy", t: "Shared source questions", stages: ["developing", "consolidating", "extending"], who: "Humanities and Science",
      what: "The same three questions for evaluating any source.",
      steps: ["Who made it?", "Why was it made?", "What evidence does it use, and how reliable is that evidence?"],
      why: "One routine across two faculties strengthens both." },
    "paired-texts": { area: "literacy", t: "Paired texts that disagree", stages: ["extending"], who: "All teachers",
      what: "Two texts on the same issue with different conclusions.",
      steps: ["Summarise each text's claim and evidence.", "Compare the strength of the evidence.", "Decide which case is stronger and justify the judgement."],
      why: "Critical reading needs something to be critical about." },
    "sentence-strategies": { area: "literacy", t: "Sentence strategies", stages: ["consolidating", "extending"], who: "English leads; all subjects practise",
      what: "Short, frequent sentence-level activities, taught in an agreed order and practised with each subject's own content.",
      steps: ["Sentence or fragment?", "*Because / but / so*", "Subordinating conjunctions (*although, unless, since*)", "Appositives", "Expanding a short sentence (who, what, when, where, why, how)", "Sentence combining"],
      why: "Grammar, punctuation and spelling are untagged in AC:English from Year 7. This is how TGS covers them.", status: "Term-by-term order to be agreed with the HoD English" },
    "paragraph": { area: "literacy", t: "TEEL paragraphs", stages: ["developing", "consolidating", "extending"], who: "All teachers",
      what: "One paragraph structure, TEEL, with the same names in every subject.",
      steps: ["**Topic sentence:** what the paragraph is about.", "**Explanation:** develop the point and say why it matters.", "**Evidence:** an example, a quote or data that backs it up.", "**Link:** connect back to the topic sentence or the question."],
      why: "The Year 3–6 writing target, and the building block for everything after it. From Year 7, claim–evidence–reasoning sits inside TEEL: the claim is the topic sentence, the reasoning is the explanation, then evidence and link." },
    "cer": { area: "literacy", t: "Claim, evidence, reasoning", stages: ["consolidating", "extending"], who: "Science, Humanities and English",
      what: "The content structure for every evidence-based body paragraph.",
      steps: ["**Claim:** a direct answer to the question.", "**Evidence:** data, a quote or an observation.", "**Reasoning:** how the evidence supports the claim."],
      why: "Matches the Year 7–10 Science and Humanities achievement-standard language. It works inside a TEEL paragraph: the claim is the topic sentence, the reasoning is the explanation, then the evidence and a link back to the question." },
    "outlines": { area: "literacy", t: "Single- and multiple-paragraph outlines", stages: ["consolidating", "extending"], who: "English leads; all subjects use",
      what: "Planning in note form before drafting.",
      steps: ["**Year 7:** single-paragraph outline: topic sentence, supporting points in note form, concluding sentence.", "**Years 8–10:** multiple-paragraph outline: a thesis, then one outlined paragraph per point, then a conclusion.", "Drafts are checked against the outline before submission."],
      why: "Planning is where structure is decided, before sentences get in the way." },
    "revision": { area: "literacy", t: "Revision as a taught step", stages: ["consolidating", "extending"], who: "All teachers",
      what: "Revising is a separate step from drafting and editing, with its own lesson time.",
      steps: ["Combine choppy sentences.", "Expand vague ones.", "Add transitions that show how ideas connect.", "Then edit with the shared self-editing checklist."],
      why: "Students rarely revise unless it is taught and given time." },
    "correction-codes": { area: "literacy", t: "Shared correction codes", stages: ["foundational", "developing", "consolidating"], who: "All teachers",
      what: "The same small set of codes for the most common errors, used in every subject.",
      steps: ["A short list of codes (sentence boundary, capital letter, spelling of subject word, missing unit…).", "Students correct their own work using the codes.", "All faculties use the same list."],
      why: "Students fix the same mistakes the same way everywhere.", status: "Code list to be agreed" },
    "identify-check-apply": { area: "numeracy", t: "Identify, check, apply", stages: ["foundational", "developing", "consolidating", "extending"], who: "Every subject other than Mathematics",
      what: "The whole-school numeracy routine (Framework Table 8). Other subjects don't re-teach Mathematics.",
      steps: ["**Identify:** name the maths in the task in plain language (“this is a rate”).", "**Check:** before the unit, a brief check of the specific skill it assumes (2–3 questions).", "**Apply:** model using the tool in this subject's own context, with Mathematics' method and language."],
      why: "Numeracy across the curriculum is mostly invisible unless it is named." },
    "no-unit": { area: "numeracy", t: "Estimate first; no unit, no mark", stages: ["foundational", "developing", "consolidating", "extending"], who: "All teachers who measure",
      what: "Every measurement starts with an estimate and ends with a unit.",
      steps: ["Estimate.", "Choose the unit and instrument.", "Measure and read the scale carefully.", "Record the result with its unit and compare it with the estimate."],
      why: "Design and Technologies barely mentions measurement in its achievement standard, but practical work depends on it. This is the habit behind infographic #3." },
    "graph-conventions": { area: "numeracy", t: "School graph conventions", stages: ["foundational", "developing", "consolidating", "extending"], who: "All teachers who use data",
      what: "One standard for every graph students draw, in every subject.",
      steps: ["A title that says what the graph shows.", "Both axes labelled, with units.", "An even scale that starts at a sensible value.", "The right type of graph for the data."],
      why: "Students meet the same expectations in Mathematics, Science, HASS and Technologies." },
    "investigation-cycle": { area: "numeracy", t: "Shared investigation cycle", stages: ["developing", "consolidating", "extending"], who: "Mathematics, Science and Geography",
      what: "One cycle for any investigation with data.",
      steps: ["Question.", "Collect (primary or secondary data).", "Represent.", "Analyse (mean, median, range; patterns and anomalies).", "Conclude, and state its limits."],
      why: "Three faculties already ask for this in their achievement standards." },
    "additive-or-multiplicative": { area: "numeracy", t: "Additive or multiplicative?", stages: ["developing", "consolidating"], who: "Mathematics leads; all subjects ask",
      what: "Before solving, students decide what kind of situation it is.",
      steps: ["Is this about adding an amount, or scaling by a factor?", "Say why.", "Choose the strategy that matches."],
      why: "The shift to multiplicative thinking is one of the critical shifts in the Framework's Number research." },
    "data-claim": { area: "numeracy", t: "Data-claim checklist", stages: ["consolidating", "extending"], who: "English, Humanities and Science",
      what: "A shared checklist for critiquing any statistical claim.",
      steps: ["Who collected the data, and how big was the sample?", "Is the graph honest (axes, scale, time frame)?", "Does the data show causation, or only correlation?", "What is left out?"],
      why: "The Extending statistics target, applied in every subject that meets data.", status: "Checklist wording to be agreed" }
  },

  // The six teaching moves that recur across every routine and classroom idea.
  // Each routine and idea is tagged below, and a symbol shows beside it wherever it appears.
  moves: [
    { id: "model", name: "Model", short: "Show it first",
      def: "The teacher shows how, thinking aloud, before students try. Then guided practice, then independent." },
    { id: "talk", name: "Talk and listen", short: "Say it, hear it",
      def: "Students say it, listen to others and discuss it, out loud, before or alongside writing." },
    { id: "practise", name: "Practise", short: "Little and often",
      def: "Short, frequent practice: guided first, then independent, until it needs little conscious attention." },
    { id: "write", name: "Write", short: "Put it in writing",
      def: "Students put it in writing using the shared structures (sentences, TEEL, outlines)." },
    { id: "words", name: "Shared words", short: "Same words, every room",
      def: "Key vocabulary taught explicitly, and the same terms used in every subject." },
    { id: "check", name: "Check", short: "Check before moving on",
      def: "Check understanding or a prerequisite, and give feedback, before moving on." }
  ],
  routineMoves: {
    "retell": ["talk", "check"], "topic-words": ["words", "model"], "full-sentence": ["talk", "words"],
    "discussion-stems": ["talk", "words"], "oral-rehearsal": ["talk", "write"], "presentation": ["talk", "model"],
    "phonics": ["model", "practise"], "fluency": ["model", "practise"], "bda": ["model", "check"],
    "text-structure": ["model", "words"], "source-questions": ["check", "words"], "paired-texts": ["check", "talk"],
    "sentence-strategies": ["practise", "write"], "paragraph": ["model", "write"], "cer": ["model", "write"],
    "outlines": ["model", "write"], "revision": ["write", "check"], "correction-codes": ["check", "write"],
    "identify-check-apply": ["words", "check", "model"], "no-unit": ["practise", "check"],
    "graph-conventions": ["model", "check"], "investigation-cycle": ["model", "practise"],
    "additive-or-multiplicative": ["talk", "check"], "data-claim": ["check", "talk"]
  },
  // Classroom ideas, by title (titles are unique enough across targets; repeated titles share tags).
  ideaMoves: {
    "Say it back": ["talk", "check"], "Words of the unit": ["words", "model"], "Stem sentences": ["talk", "words"], "Talk partners": ["talk", "practise"],
    "Daily phonics lesson (class teacher)": ["model", "practise"], "Matched practice texts": ["practise"], "Repeated reading": ["model", "practise"], "Specialist teachers: read aloud": ["model", "words"],
    "Little and often handwriting": ["model", "practise"], "Say it, then write it": ["talk", "write"], "Join two sentences": ["practise", "write"], "Same words everywhere": ["words"],
    "Stems on every wall": ["words", "talk"], "Think, pair, share with a stem": ["talk"], "A presentation outside English": ["talk", "model"], "Listen and note": ["talk", "write"],
    "Show the structure first": ["model", "words"], "Before, during, after": ["model", "check"], "Teach the words, including their parts": ["words"], "Read the visuals": ["model", "check"],
    "TEEL in every subject": ["model", "write"], "Model, guide, release": ["model", "practise"], "Name the genre": ["words", "model"], "Sentence combining with real content": ["practise", "write"],
    "Say it before you write it": ["talk", "write"], "Sentence strategies out loud": ["talk", "practise"], "Paraphrase before you respond": ["talk", "check"], "Upgrade the language": ["words", "talk"],
    "Each faculty teaches its own text types": ["model", "words"], "Because / but / so as a comprehension check": ["check", "write"], "Shared source questions": ["check", "words"], "Vocabulary in the unit plan": ["words"],
    "Outline before drafting": ["model", "write"], "Claim, evidence, reasoning": ["model", "write"], "Five-minute sentence starters": ["practise", "write"], "Same correction codes": ["check", "write"],
    "An assessed oral outside English": ["talk", "check"], "Seminar with prepared positions": ["talk", "practise"], "Audience switch": ["talk", "model"],
    "Paired texts that disagree": ["check", "talk"], "Claim tracker": ["check", "write"], "Spot the positioning": ["words", "check"],
    "Multiple-paragraph outline with a thesis": ["model", "write"], "Take apart a model answer": ["model", "check"], "Revision as its own lesson step": ["write", "practise"], "Teach the subject's referencing": ["model", "words"],
    "Daily counting and subitising warm-up": ["practise", "talk"], "Concrete before symbols": ["model", "practise"], "Name the strategy": ["talk", "words"], "Other learning areas": ["practise"],
    "Why must units match?": ["model", "check"], "Shape hunt with feature talk": ["talk", "words"], "Position games in HPE": ["words", "practise"], "Time in the daily routine": ["words", "practise"],
    "Question of the week": ["practise"], "Read the graph": ["talk", "check"], "Chance talk": ["talk", "words"],
    "Daily fact fluency": ["practise"], "One set of representations": ["model", "words"], "Additive or multiplicative?": ["talk", "check"], "Real money in HASS": ["check", "practise"],
    "Estimate, measure, check": ["practise", "check"], "No unit, no mark": ["check"], "Scale-reading check before a practical": ["check"], "Real timetables": ["practise"],
    "One set of graph conventions": ["model", "check"], "Choose and justify": ["write", "check"], "Describe the trend": ["talk", "write"], "Expected versus observed": ["practise", "check"],
    "Name the maths": ["words"], "Three-question prerequisite check": ["check"], "A shared formula bank": ["model", "practise"],
    "State the accuracy": ["check"], "Scale is a ratio": ["words", "model"], "Repeat and average": ["practise", "check"], "Name the geometry": ["words"],
    "One investigation cycle": ["model", "practise"], "Which average?": ["talk", "check"], "Limits sentence": ["write"], "Probability where it appears": ["words"],
    "Financial decisions with a prerequisite check": ["check", "practise"], "Gradient is a rate of change": ["words", "model"], "Reasonableness check": ["check"],
    "Use Mathematics' method": ["model"], "Report uncertainty": ["write", "check"], "Tolerances": ["practise", "check"],
    "A shared data-claim checklist": ["check"], "Spot the misleading graph": ["check", "talk"], "Risk in Health": ["model", "practise"]
  },

  implementation: {
    roles: [
      { role: "All subject teachers", resp: "Day-to-day differentiated practice; consistent use of shared literacy and numeracy language; identifying and applying opportunities within their own subject." },
      { role: "English Head of Department", resp: "Ownership of the Literacy chapter's definitions, curriculum linkage and explicit teaching standards." },
      { role: "Mathematics Head of Department", resp: "Ownership of the Numeracy chapter's definitions, curriculum linkage and explicit teaching standards." },
      { role: "Junior School Curriculum Head", resp: "P–6 continuity and the transition into secondary disciplinary literacy and numeracy demands." },
      { role: "Learning Enhancement / Diverse Learners team", resp: "Coordinated support for students with identified literacy or numeracy needs." },
      { role: "Teaching and Learning leadership", resp: "Framework review, oversight of the Year 1 data audit, and cross-faculty consistency." }
    ],
    measurement: [
      { stage: "foundational", year: "Year 2", standardised: "— (no NAPLAN)", teacher: "Phonics/decoding check, oral reading fluency, writing sample, early-number assessment", gaps: "Choose the early-years tools; P–2 oral language checklist" },
      { stage: "developing", year: "Year 6 (Year 4 for decoding)", standardised: "NAPLAN Years 3 and 5; PAT-R, PAT-M", teacher: "Speaking rubric; cross-subject paragraph task", gaps: "Speaking rubric; Year 6 has no NAPLAN, so PAT is the end-of-stage measure" },
      { stage: "consolidating", year: "Year 9", standardised: "NAPLAN Years 7 and 9; PAT-R, PAT-M", teacher: "Oral rubric; moderated cross-faculty extended response; sentence-level tasks", gaps: "Oral rubric; moderation process; order for teaching sentence strategies" },
      { stage: "extending", year: "Year 10", standardised: "PAT-R / PAT-M if run in Year 10", teacher: "Faculty assessment; moderated Year 10 writing sample", gaps: "Whether PAT runs in Year 10; Years 11–12 measures (QCE)" }
    ],
    tier2: [
      { area: "literacy", when: "End of Year 2", what: "Decoding and fluency below benchmark.", link: "#/literacy/foundational/reading" },
      { area: "literacy", when: "End of Year 4", what: "Not yet reading year-level text fluently.", link: "#/literacy/developing/reading" },
      { area: "literacy", when: "Year 7 NAPLAN", what: "Reading below expectation. Years 7–8 close the explicit reading period.", link: "#/literacy/consolidating/reading" },
      // Numeracy points are proposed: thresholds to be agreed with the Mathematics HoD and the Diverse Learners team.
      // Each sits where the workbook shows a constrained numeracy skill concluding.
      { area: "numeracy", proposed: true, when: "End of Year 2", what: "Not yet trusting the count, or still counting by ones instead of using place value and additive strategies, on the early-number assessment.", link: "#/numeracy/foundational/na" },
      { area: "numeracy", proposed: true, when: "Year 5 NAPLAN or PAT-M", what: "Counting processes not secure. In the progressions, counting processes conclude by Year 5.", link: "#/numeracy/developing/na" },
      { area: "numeracy", proposed: true, when: "Year 7 NAPLAN", what: "Additive strategies or fractions not secure before proportional reasoning depends on them. Additive strategies conclude by Year 8, and interpreting fractions by Year 9.", link: "#/numeracy/consolidating/na" }
    ],
    nextSteps: [
      { t: "Stage targets", d: "One target per domain per stage, with lead methods and subject strategies.", status: "Drafted" },
      { t: "Run the targets past HoD English, Junior School Curriculum and Director of Studies", d: "Including each Head of Department checking their own subject table.", status: "Next" },
      { t: "Measuring success", d: "Year 1 data audit; confirm tools for early years, oral language and Year 10.", status: "Not started" },
      { t: "Implementation timeline with evaluation checkpoints", d: "Mapped to the stages, built into the Framework.", status: "Not started" },
      { t: "Tier 1–3 intervention plan", d: "Including how Tier 2 and 3 students are identified, with the Diverse Learners team.", status: "Not started" },
      { t: "Handbook and PD sequence", d: "Turning the routines on this site into a staff handbook and a professional learning sequence.", status: "Not started" },
      { t: "Years 11–12", d: "Mapping the Extending targets to QCE syllabuses.", status: "Not started" },
      { t: "Simplify the Framework", d: "Shorten, fix numbering and grammar-check the full document.", status: "Not started" }
    ],
    questions: [
      "Do the targets match what Heads of Department see as the real need at each stage?",
      "Should the Years 7–10 writing method name The Writing Revolution, or describe it by its activities as it does now? Framework §2.5 needs reconciling either way.",
      "What order are the sentence strategies taught in, term by term, in Years 7–10?",
      "Who writes the shared oral rubrics (P–2, 3–6, 7–10)?",
      "The numeracy Tier 2 referral points (end of Year 2, Year 5, Year 7) are proposed. Confirm the points and thresholds with the Mathematics Head of Department and the Diverse Learners team.",
      "The subject tables rest on the workbook's reading of each achievement standard, and several cells are inferred. Each Head of Department should check their own.",
      "The Arts, Languages, numeracy in English and literacy in Mathematics are not yet covered."
    ]
  },

  progressions: {
    what: "A learning progression describes a common pathway of development: the observable signs that a student is becoming more sophisticated in an aspect of literacy or numeracy.",
    notCurriculum: "The progressions do not describe *what to teach*. The Australian Curriculum sets what is taught at each year level; the progressions map *how students become increasingly adept*. Levels are not equal steps of time, and students move through them at different rates.",
    constrained: "**Constrained** skills are learned within a bounded window and then consolidated rather than re-taught. **Unconstrained** skills keep developing all the way through school.",
    scope: "The progressions and AC content descriptors run Foundation to Year 10 only. Years 11–12 use QCE syllabuses and are not mapped yet.",
    confidence: { literacy: "Medium confidence. The source for English isn't organised by sub-element, so filing each code under a sub-element was a judgement call. The codes themselves are real and year-correct.", numeracy: "High confidence. QCAA's source is organised by sub-element, so codes come straight from it." }
  }
};
