# San José AI reporting — 92 Logics prototype

This folder is a static prototype by 92 Logics (Islamabad; public site https://www.92logics.com). It is not an official City of San José system and it is not a bid or proposal.

Open `index.html` in a browser. No build step, no network, and no API key. `app.js` only matches prompts to answers written from the pages listed below.

Prototype contact: cowork@92logics.com. The public homepage fetched on 3 October 2026 lists a different general address, contact@92logics.com, and the office line “2nd Floor, Emirates Tower, M-13, F-7 Markaz, Islamabad, Pakistan.”

## Buyer and notice

- Buyer: City of San José, Purchasing Division, Finance Department. The purchasing page lists 200 E. Santa Clara St., San José, CA 95113, phone (408) 535-7050, Monday–Friday 8:00 a.m.–4:00 p.m.
- Notice URL used for the lead: https://www.biddingo.com/sanjose
- Solicitation number on aggregator pages: PUR-RFP2026.09.10071
- Titles on those pages: “AI Reporting Tool” in the overview quoted by CLEATUS; “AI Reporting Services” on Scout and Bidscope.
- CRM lead id 22 in `/workspace/92logics-crm/leads.csv` (read only; the file was not edited). Contact email column is empty. The note says there is no verified public buyer email on open pages.

## What the fetched notice text says

CLEATUS quotes a solicitation overview (https://www.cleat.ai/government/contracts/ai-reporting-services-xt1r):

- The City of San José is soliciting responses from qualified vendors for an AI Reporting Tool.
- Closing date in that quote: 22 October 2026, 12:00:00 p.m. PT. The same page also shows 22 October 2026, 7:00:00 p.m. UTC, the same instant as noon Pacific Daylight Time (12:00 a.m. PKT on 23 October 2026).
- Responses must be submitted online through Biddingo, including required forms and documentation if applicable.
- Questions about how to register or submit: Biddingo (800) 208-1290 or info@biddingo.com. That is portal support in the quoted text, not a City buyer mailbox.
- Freight/shipping at no cost to the City, “FOB Destination prepaid,” unless otherwise specified.
- Do not include sales tax; the City will work with the selected vendor on applicable tax.
- Quantities, if specified, are estimates, not guaranteed, and do not support a unit-price adjustment. No quantity was printed in the quoted overview.
- Award is “best value” under evaluation criteria in the solicitation documents (basis of award described as non-price determinative). The criteria text was not in the quote.
- LBE/SBE preference applies. The quote says a business with an office in Santa Clara County and a valid City of San José Business Tax Certificate should refer to the solicitation documents. The preference may not be requested after closing.

The City purchasing page (https://www.sanjoseca.gov/your-government/departments-offices/finance/purchasing) says bid and proposal opportunities are at https://www.biddingo.com/sanjose and that there is no cost to sign up, view bids, or submit responses.

Bidscope (https://bidscopeai.com/opportunities/eb743146-e4fc-4a4c-bb80-1c4e942a6a4e) titles the item AI Reporting Services, calls it an RFP, and says its summary deadline is 22 October 2026 at 12:00 p.m. Pacific Time. A separate field on that page reads “Oct 22, 2026 07:00 PM” with no zone on the field. It says the materials it has do not include a scope of work, technical requirements, deliverables, contract term, pricing, or required submission documents. It lists NAICS 541618 and PSC D317. Those codes were not confirmed from a City file. CLEATUS general info instead shows NAICS 518210, also unconfirmed from a City file.

## What was not verified

https://www.biddingo.com/sanjose returned an application shell (HTML title “Biddingo,” no solicitation body). This prototype did not log in. Unread: the packet, attachments, questions and answers, addenda, evaluation weights, pricing, and contract term.

Scout (https://scoutgrants.ai/grant/42380213-7fdb-4e77-95c2-7a73c0a878d0/) shows one paragraph that the City is seeking a secure, enterprise-grade AI Reporting Tool using artificial intelligence, machine learning, and multimodal large language models, to support automated police report drafting from body-worn camera video, audio, and related incident data. The next line is cut off (“The contractor …”) and source links require an account. That paragraph is not in the CLEATUS quoted overview. It is not treated as confirmed scope. The demo does not invent incident reports or crime figures.

CLEATUS’s narrative names a contracting officer “Sarah Yanez.” The quoted solicitation text on that page does not, and the page’s contact widget shows contact@example.gov. No buyer email is treated as verified.

Aggregator posted date 22 September 2026 was not on a City HTML page fetched here. CRM “date found” is 29 September 2026 and is not a posted date.

Bidscope lists a file titled “CPM 46 12132022.pdf” and shows sample comments about a roof addendum. Those were not opened as City documents and are not used as scope.

## Other City pages, not this solicitation

Fetched only so the script can refuse to mix them in:

- Upcoming IT Projects (https://www.sanjoseca.gov/your-government/departments-offices/information-technology/it-projects-pmo/upcoming-it-projects) lists “Enterprise Generative AI Chatbot Solution” as closed on 12/15/2025. It says vendors register on Biddingo at no cost to receive and respond, and that Biddingo offers optional for-fee services. PUR-RFP2026.09.10071 is not in that table.
- News release, 15 October 2025 (https://www.sanjoseca.gov/Home/Components/News/News/6961/4699), about that earlier generative AI platform RFP, expected to release 17 October 2025. It describes document summary, drafting reports and communications, code review, and charts. Its headline refers to productivity for 7,000 City employees. The “About the City” text says “almost 1 million residents” and “the 12th largest city in the nation.” Those lines are about that release, not about PUR-RFP2026.09.10071.
- Artificial Intelligence & Inventory (https://www.sanjoseca.gov/your-government/departments-offices/information-technology/digital-privacy/ai-reviews-algorithm-register): eight AI principles, Vendor AI FactSheet process, inventory maintained since January 2023, and named systems (including Google AutoML for SJ311, LYT.transit, Zabble, Wordly, traffic/ALPR tools, and others). Figures on that page describe those systems. They are not performance numbers for this RFP.

Any figure the assistant does not have from a fetched page is labeled in the page as a placeholder.

## Files

- `index.html` — page
- `styles.css` — layout
- `app.js` — offline prompt script
- `README.md` — this note
