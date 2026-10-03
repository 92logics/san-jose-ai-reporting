(function () {
  "use strict";

  var PH = '<span class="placeholder">[placeholder — not in a fetched public source]</span>';

  var prompts = [
    { label: "Public scope", q: "What does the public notice say this solicitation is?" },
    { label: "Deadline and submission", q: "When is the response due and how is it submitted?" },
    { label: "Award, tax, freight, LBE/SBE", q: "What do the fetched pages say about award basis, tax, freight, and LBE/SBE?" },
    { label: "Buyer email", q: "Is there a verified buyer contact email?" },
    { label: "Body-worn camera claim", q: "Is automated police-report drafting from body-worn cameras confirmed?" },
    { label: "Not the 2025 chatbot RFP", q: "Is this the same as the 2025 enterprise generative AI chatbot solicitation?" },
    { label: "City AI review context", q: "What does the City publish about AI review that is separate from this RFP?" },
    { label: "Could not verify", q: "What could not be verified because Biddingo did not show the packet?" },
    { label: "Scripted briefing", q: "Draft a short briefing from the fetched pages only." }
  ];

  function sources(items) {
    return '<p class="src">Fetched pages: ' + items.join(" · ") + "</p>";
  }

  function replyFor(raw) {
    var q = raw.toLowerCase();

    if (/brief|draft a|one-page|summary note/.test(q)) {
      return (
        "<p><strong>Scripted briefing.</strong> This note only restates pages fetched for this prototype. It is not a proposal and not a city document.</p>" +
        "<p><strong>Buyer.</strong> City of San José, Purchasing Division of the Finance Department. The purchasing page lists 200 E. Santa Clara St., San José, CA 95113, phone (408) 535-7050, Monday–Friday 8:00 a.m.–4:00 p.m. CLEATUS labels the agency “City of San José - Purchasing.”</p>" +
        "<p><strong>Notice.</strong> PUR-RFP2026.09.10071. CLEATUS quotes the solicitation overview as the City “soliciting responses from qualified vendors for an AI Reporting Tool.” Scout and Bidscope title the same number “AI Reporting Services.”</p>" +
        "<p><strong>Deadline in the quoted text.</strong> 22 October 2026, 12:00 p.m. Pacific Time (CLEATUS full description; also shown there as 22 October 2026, 7:00 p.m. UTC). That is 12:00 a.m. PKT on 23 October 2026. Submission: online through Biddingo, including required forms. The City purchasing page says there is no cost to sign up, view bids, or submit responses at biddingo.com/sanjose.</p>" +
        "<p><strong>Commercial terms in the quoted overview (not a scope of work).</strong> Freight/shipping at no cost to the City, “FOB Destination prepaid,” unless the solicitation says otherwise. Do not include sales tax; the City will work with the selected vendor on applicable tax. Estimated quantities are not guaranteed and do not justify a unit-price change. Award is “best value” under the evaluation criteria in the solicitation documents (non-price determinative). LBE/SBE preference applies; the quoted text says a business with an office in Santa Clara County and a valid City of San José Business Tax Certificate should see the solicitation documents, and the preference may not be requested after closing.</p>" +
        "<p><strong>Scope that is not in the quoted overview.</strong> Technical requirements, deliverables, contract term, pricing, and required forms were not in the pages that loaded. Bidscope says its materials do not include a scope of work. A Scout paragraph about police-report drafting from body-worn camera video is not treated as confirmed (see that prompt).</p>" +
        "<p><strong>Fields with no public figure on the fetched pages.</strong> Contract value " + PH + ". User count for this tool " + PH + ". Evaluation weights " + PH + ". Buyer email " + PH + ".</p>" +
        sources([
          "cleat.ai contract page",
          "bidscopeai.com opportunity page",
          "scoutgrants.ai grant page",
          "sanjoseca.gov Purchasing"
        ])
      );
    }

    if (/body-worn|body worn|police report|multimodal|bwc|camera/.test(q)) {
      return (
        "<p><strong>Not confirmed from a city document.</strong> The Scout page for PUR-RFP2026.09.10071 shows this paragraph, then cuts off (“The contractor …”), and its source links sit behind an account:</p>" +
        "<p>“The City of San José is seeking qualified vendors to provide a secure, enterprise-grade AI Reporting Tool that utilizes advanced artificial intelligence, machine learning, and multimodal large language models. The goal of this contract is to support automated police report drafting using body-worn camera video, audio, and related incident data.”</p>" +
        "<p>That wording is not in the solicitation overview quoted on the CLEATUS page. Bidscope says the materials it has do not include a scope of work, technical requirements, or deliverables. The Biddingo San José URL returned an application shell with no notice text, so the city packet was not read. This prototype does not draft a police report and does not invent incident facts.</p>" +
        sources(["scoutgrants.ai grant page", "cleat.ai contract page", "bidscopeai.com opportunity page", "biddingo.com/sanjose"])
      );
    }

    if (/email|contact|sarah|yanez|phone|who is the buyer|buyer/.test(q) && !/lbe|freight|tax/.test(q)) {
      return (
        "<p><strong>No verified buyer email</strong> on the pages fetched for this prototype, and none in the CRM lead’s contact field.</p>" +
        "<p>CLEATUS’s narrative summary names a contracting officer “Sarah Yanez,” but the solicitation text quoted on that same page does not name an officer, and the page’s contact widget shows contact@example.gov. That address is not treated as real. The name is not confirmed here.</p>" +
        "<p>What the City purchasing page does publish: Finance Department Purchasing, 200 E. Santa Clara St., San José, CA 95113, (408) 535-7050, Monday–Friday 8:00 a.m.–4:00 p.m. The quoted solicitation text tells vendors to direct Biddingo registration or submission-how-to questions to Biddingo at (800) 208-1290 or info@biddingo.com. That is the portal vendor, not a verified City buyer mailbox for this RFP.</p>" +
        sources(["cleat.ai contract page", "sanjoseca.gov Purchasing", "CRM leads.csv id 22 (contact field empty)"])
      );
    }

    if (/2025|chatbot|generative ai platform|same as|different rfp|enterprise generative/.test(q)) {
      return (
        "<p><strong>No.</strong> The City’s “Enterprise Generative AI Chatbot Solution” is a different item. The Upcoming IT Projects page describes a secure, enterprise-wide platform on pretrained transformer technology and lists it as closed on 12/15/2025. PUR-RFP2026.09.10071 is a 2026 notice titled around an AI reporting tool/services, with a 22 October 2026 close in the aggregator text.</p>" +
        "<p>The 15 October 2025 news release (expected release 17 October 2025) describes that earlier platform’s intended uses as analyzing and summarizing documents, drafting reports and other communications, supporting software development and code review, and generating charts and analyzing data. Its headline says the City sought a tool “to increase productivity for 7,000 City employees.” The “About the City” blurb on that release says “almost 1 million residents” and “the 12th largest city in the nation.” Those figures belong to that news release. They are not scope numbers for PUR-RFP2026.09.10071.</p>" +
        "<p>That release also says the City has used an AI tool for building-permit reviews, bus-route optimization, object-detection tools, and automated license plate readers managed by the Police Department. Those are listed as existing efforts, not as the statement of work for this 2026 reporting solicitation.</p>" +
        sources([
          "sanjoseca.gov Upcoming IT Projects",
          "sanjoseca.gov news release 15 Oct 2025",
          "cleat.ai contract page"
        ])
      );
    }

    if (/principle|factsheet|inventory|ai review|governance|handbook|what does the city publish/.test(q)) {
      return (
        "<p><strong>Separate from this RFP.</strong> The City’s Artificial Intelligence &amp; Inventory page describes how San José reviews AI tools. It is not the PUR-RFP2026.09.10071 packet.</p>" +
        "<p>The page lists eight principles: Effectiveness, Transparency, Equity, Accountability, Human-Centered Design, Privacy, Security &amp; Safety, and Workforce Empowerment. It says the Privacy and AI team works with vendors on a Vendor AI FactSheet (data used to build the system and conditions it performs well under), inspired by IBM Research AI FactSheets 360, and that the AI inventory has been maintained since January 2023.</p>" +
        "<p>Systems named on that page include Google AutoML Translation for SJ311 (English, Vietnamese, Spanish), LYT.transit signal priority for VTA routes 66 and 68, Zabble waste-contaminant identification, Wordly real-time translation, traffic and ALPR-related tools, people-counter cameras, anonymized foot-traffic data, and a gunshot-detection pilot. Performance figures on that page (for example AutoML BLEU scores, or a 2019 LYT pilot that “may reduce travel times by more than 15%”) describe those inventory systems. They are not metrics for this solicitation. Nothing on the fetched inventory page states that PUR-RFP2026.09.10071 is for any of those systems.</p>" +
        sources(["sanjoseca.gov Artificial Intelligence & Inventory"])
      );
    }

    if (/could not|unverified|biddingo|login|packet|addend|what is missing|not verify/.test(q)) {
      return (
        "<p><strong>Not verified, because the portal did not show the notice.</strong> https://www.biddingo.com/sanjose returned an HTML application shell (title “Biddingo,” scripts, no solicitation body). This prototype did not log in. The packet, attachments, questions and answers, addenda, evaluation weights, pricing sheets, and contract term were not read.</p>" +
        "<ul>" +
        "<li>Whether the Scout body-worn-camera paragraph is in the city document.</li>" +
        "<li>A buyer email. CRM lead 22’s contact field is empty. CLEATUS shows contact@example.gov, which is not used.</li>" +
        "<li>NAICS. CLEATUS general info shows 518210. Bidscope shows NAICS 541618 and PSC D317. Neither code was confirmed from a city file.</li>" +
        "<li>Posted time. Aggregators say 22 September 2026. That date is not on the city pages fetched. CRM “date found” is 29 September 2026, which is not a posted date.</li>" +
        "<li>Bidscope’s document list shows a file titled “CPM 46 12132022.pdf” and sample comments about a roof addendum. Those do not match an AI reporting scope and were not opened as city documents.</li>" +
        "<li>Any quantity, price, headcount, or accuracy target for this tool. " + PH + "</li>" +
        "</ul>" +
        "<p>The City purchasing page and the Upcoming IT Projects page both say current bids are on Biddingo and that registration to receive and respond is at no cost. Biddingo also offers optional for-fee services (Upcoming IT Projects page).</p>" +
        sources(["biddingo.com/sanjose", "sanjoseca.gov Purchasing", "sanjoseca.gov Upcoming IT Projects", "cleat.ai", "bidscopeai.com"])
      );
    }

    if (/deadline|due|submit|when|biddingo|closing|close/.test(q)) {
      return (
        "<p>The solicitation text quoted by CLEATUS says the closing date is <strong>22 October 2026, 12:00:00 p.m. PT</strong>, and that all responses must be submitted online through Biddingo, including required forms and documentation if applicable. The same CLEATUS page also labels the deadline 22 October 2026, 7:00:00 p.m. UTC, which is the same instant as noon Pacific Daylight Time. In Asia/Karachi that is <strong>12:00 a.m. PKT on 23 October 2026</strong>.</p>" +
        "<p>Bidscope’s summary also says 22 October 2026 at 12:00 p.m. Pacific Time. A separate Bidscope field reads “Oct 22, 2026 07:00 PM” without a zone on that field. Posted date on Bidscope and the CLEATUS timeline: 22 September 2026. That posted date was not confirmed on a city HTML page.</p>" +
        "<p>The City purchasing page says bid and proposal opportunities are at https://www.biddingo.com/sanjose and that there is no cost to sign up, view bids, or submit responses. Questions about how to register or submit are directed, in the quoted solicitation text, to Biddingo at (800) 208-1290 or info@biddingo.com.</p>" +
        sources(["cleat.ai contract page", "bidscopeai.com opportunity page", "sanjoseca.gov Purchasing"])
      );
    }

    if (/lbe|sbe|tax|freight|award|best value|preference|fob|quantit/.test(q)) {
      return (
        "<p>From the solicitation overview quoted on CLEATUS (this is boilerplate around the notice, not a technical scope):</p>" +
        "<ul>" +
        "<li><strong>Award.</strong> “Best value” under the evaluation criteria in the solicitation documents. The heading says the basis of award is non-price determinative. The criteria themselves were not in the fetched text.</li>" +
        "<li><strong>LBE/SBE.</strong> The City’s Local and Small Business Enterprise preference applies. The quote says if the business has an office in Santa Clara County and a valid City of San José Business Tax Certificate, refer to the solicitation documents. The preference may not be requested after the closing date/time.</li>" +
        "<li><strong>Sales tax.</strong> Do not include sales tax in the response. The City will work with the selected vendor on applicable tax for award.</li>" +
        "<li><strong>Freight.</strong> At no cost to the City, “FOB Destination prepaid,” unless otherwise specified.</li>" +
        "<li><strong>Quantities.</strong> Any quantities in the solicitation are estimates, not guaranteed, and variation does not entitle a unit-price adjustment. No quantity figure was in the fetched overview. " + PH + "</li>" +
        "</ul>" +
        sources(["cleat.ai contract page"])
      );
    }

    if (/contract value|price|budget|headcount|how many|user count|evaluation weight|accuracy|crime|incident count/.test(q)) {
      return (
        "<p>No figure for that was printed in the pages fetched for PUR-RFP2026.09.10071. " + PH + "</p>" +
        "<p>The quoted solicitation overview says any quantities in the documents are estimates and are not guaranteed, but it does not print a quantity. Bidscope says its materials do not include pricing. City inventory metrics and the October 2025 news-release lines (7,000 employees; “almost 1 million residents”) are about other pages, not this solicitation.</p>" +
        sources(["cleat.ai contract page", "bidscopeai.com opportunity page"])
      );
    }

    if (/scope|what is|reporting tool|solicitation|notice|rfp|10071/.test(q)) {
      return (
        "<p><strong>What the fetched notice text actually says.</strong> PUR-RFP2026.09.10071. The overview quoted by CLEATUS says the City of San José is soliciting responses from qualified vendors for an <strong>AI Reporting Tool</strong>. Scout and Bidscope use the title <strong>AI Reporting Services</strong> for the same number. Bidscope calls it an RFP, status open on that page, procurement type Service, place San Jose, CA.</p>" +
        "<p>That quoted overview does not define the reports, the department, the data, or the model. Bidscope states that its materials do not include a scope of work, technical requirements, deliverables, contract term, pricing, or required submission documents.</p>" +
        "<p>A longer Scout paragraph (enterprise-grade tool, machine learning, multimodal models, police-report drafting from body-worn camera video, audio, and incident data) is on that aggregator only, truncated, with source links locked. It is not repeated here as confirmed scope.</p>" +
        sources(["cleat.ai contract page", "bidscopeai.com opportunity page", "scoutgrants.ai grant page"])
      );
    }

    return (
      "<p>This page is a scripted assistant. It does not call a model and it will not invent a city statistic or a scope line.</p>" +
      "<p>Try one of the labeled prompts: public scope, deadline and submission, award/tax/freight/LBE-SBE, buyer email, the body-worn-camera claim, the 2025 chatbot RFP, the City AI inventory, what Biddingo did not show, or a scripted briefing.</p>" +
      sources(["local script only"])
    );
  }

  var log = document.getElementById("log");
  var form = document.getElementById("ask");
  var input = document.getElementById("q");
  var chips = document.getElementById("chips");

  function add(role, html) {
    var el = document.createElement("div");
    el.className = "msg " + role;
    el.innerHTML = html;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }

  function ask(text) {
    var trimmed = text.replace(/\s+/g, " ").trim();
    if (!trimmed) return;
    add("user", "<p>" + trimmed.replace(/[&<>]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
    }) + "</p>");
    add("bot", replyFor(trimmed));
    input.value = "";
  }

  prompts.forEach(function (p) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = p.label;
    b.addEventListener("click", function () { ask(p.q); });
    chips.appendChild(b);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    ask(input.value);
  });

  document.getElementById("clear").addEventListener("click", function () {
    log.innerHTML = "";
    greet();
  });

  function greet() {
    add(
      "bot",
      "<p>Scripted reporting assistant for <strong>PUR-RFP2026.09.10071</strong>. Answers are written in advance from pages fetched on 3 October 2026. Nothing here is sent to an AI service.</p>" +
      "<p>92 Logics prototype only. Not an official City of San José system and not a bid.</p>" +
      "<p>Choose a prompt, or ask in those words. If a number was not on a fetched page, it is marked " + PH + ".</p>"
    );
  }

  greet();
})();
