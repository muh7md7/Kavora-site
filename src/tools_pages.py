"""Content for the free tools library (/tools/). Each tool = working UI + a useful guide + FAQ."""

CURRENCIES = ["PKR", "AED", "SAR", "USD", "GBP", "EUR", "INR", "QAR", "KWD", "OMR", "BHD", "CAD", "AUD"]

def cur_select(name="currency", default="USD"):
    return f'<select class="tf" name="{name}" aria-label="Currency">' + "".join(
        f'<option{" selected" if c == default else ""}>{c}</option>' for c in CURRENCIES) + "</select>"

TOOLS = [
  {
    "slug": "invoice-generator",
    "name": "Invoice Generator",
    "short": "Make a clean, professional invoice and save it as a PDF in under a minute.",
    "title": "Free Invoice Generator (PDF) for Freelancers & Small Businesses | Kavora Tools",
    "desc": "Create a professional invoice online for free. Add line items, tax and discount, then download it as a PDF. Works in PKR, AED, SAR, USD and more. No sign-up.",
    "h1": "Free invoice generator",
    "icon": "🧾",
    "ui": f"""
<form id="inv" class="tool-card" onsubmit="return false">
  <div class="tgrid2">
    <label class="tl">Your business<textarea class="tf" name="from" rows="3" placeholder="Your name or business&#10;Address&#10;Email or phone"></textarea></label>
    <label class="tl">Bill to<textarea class="tf" name="to" rows="3" placeholder="Client name&#10;Company&#10;Address"></textarea></label>
  </div>
  <div class="tgrid4">
    <label class="tl">Invoice number<input class="tf" name="number"></label>
    <label class="tl">Issue date<input class="tf" type="date" name="date"></label>
    <label class="tl">Due date<input class="tf" type="date" name="due"></label>
    <label class="tl">Currency{cur_select()}</label>
  </div>
  <div class="inv-head"><span>Description</span><span>Qty</span><span>Unit price</span><span></span></div>
  <div id="inv-rows"></div>
  <button type="button" class="tbtn ghost" id="inv-add">+ Add line</button>
  <div class="tgrid2" style="margin-top:14px">
    <label class="tl">Tax (%)<input class="tf" type="number" name="tax" min="0" step="any" value="0"></label>
    <label class="tl">Discount (%)<input class="tf" type="number" name="discount" min="0" step="any" value="0"></label>
  </div>
  <label class="tl">Notes or payment details<textarea class="tf" name="notes" rows="2" placeholder="Bank account, payment terms, thank-you note"></textarea></label>
  <div class="tactions"><button type="button" class="tbtn" id="inv-print">Download PDF</button><button type="button" class="tbtn ghost" id="inv-reset">Start over</button></div>
  <p class="muted-s">Your invoice stays in this browser. Nothing is uploaded.</p>
</form>
<div class="tool-card inv-paper" id="inv-preview" aria-live="polite"></div>""",
    "guide": """
<h2>How to make an invoice that gets paid on time</h2>
<p>An invoice is more than a bill. It is the document your client's accounts team checks before releasing money, so anything missing slows payment down. A complete invoice answers four questions at a glance: who is asking to be paid, who should pay, what for, and by when.</p>
<h3>What every invoice should include</h3>
<ul>
<li><b>A unique invoice number.</b> Use a simple sequence such as INV-2611-01 so you and your client can refer to it in emails and bank transfers.</li>
<li><b>Issue date and due date.</b> "Due on receipt" is vague; a real date (for example 7 or 14 days after issue) is easier to enforce.</li>
<li><b>Your details and your client's details.</b> Business name, address and a contact email. Add your tax registration number if you are registered for VAT or sales tax.</li>
<li><b>Clear line items.</b> Describe the work in words your client will recognise, with quantity and unit price, so nobody has to ask what a number means.</li>
<li><b>Tax and discount shown separately.</b> Clients need to see the tax amount on its own line for their own records.</li>
<li><b>How to pay.</b> Bank account, IBAN, payment link or wallet details in the notes field.</li>
</ul>
<h3>How to use this generator</h3>
<ol>
<li>Fill in your business details and your client's details.</li>
<li>Add each product or service as a line with quantity and price. The total updates as you type.</li>
<li>Add a tax rate (for example 5% VAT in the UAE) and any discount.</li>
<li>Press <b>Download PDF</b> and choose "Save as PDF" in the print window.</li>
</ol>
<p>Your last invoice is remembered in this browser, so next time you only need to change the client, the date and the line items.</p>
<h3>Tips for getting paid faster</h3>
<p>Send the invoice the same day the work is delivered, while the value is fresh. Put the total and due date in the email subject line. For repeat clients, agree payment terms once in writing and reuse them. If an invoice is late, a short, friendly reminder on the due date works better than waiting a month.</p>""",
    "faqs": [
      ("Is this invoice generator really free?", "Yes. There is no sign-up, no watermark and no limit on the number of invoices."),
      ("Where is my invoice data stored?", "Only in your own browser. Nothing you type is sent to our servers."),
      ("How do I save the invoice as a PDF?", "Press Download PDF, then choose Save as PDF as the printer. On a phone, use the share or print option and save to Files."),
      ("Can I add VAT or sales tax?", "Yes. Enter the tax rate as a percentage and it is calculated on the total after any discount."),
    ],
    "related": ("Kavora Studio", "Notion and Canva business systems, including client onboarding and proposals.", "/store/#kavora-studio"),
    "keywords": ["invoice generator", "free invoice maker", "invoice template pdf", "invoice generator Pakistan", "invoice generator UAE"],
  },
  {
    "slug": "whatsapp-link-generator",
    "name": "WhatsApp Link & QR Generator",
    "short": "Create a click-to-chat WhatsApp link and QR code with a ready-typed message.",
    "title": "Free WhatsApp Link Generator with QR Code (wa.me) | Kavora Tools",
    "desc": "Create a wa.me WhatsApp click-to-chat link with a pre-filled message and a printable QR code. Perfect for Instagram bios, ads, flyers and shop counters. Free.",
    "h1": "WhatsApp link and QR code generator",
    "icon": "💬",
    "ui": """
<form id="wa" class="tool-card" onsubmit="return false">
  <div class="tgrid-phone">
    <label class="tl">Country<select class="tf" name="code" aria-label="Country code">
      <option value="92">Pakistan +92</option><option value="971">UAE +971</option><option value="966">Saudi Arabia +966</option>
      <option value="974">Qatar +974</option><option value="965">Kuwait +965</option><option value="968">Oman +968</option><option value="973">Bahrain +973</option>
      <option value="91">India +91</option><option value="44">United Kingdom +44</option><option value="1">USA / Canada +1</option><option value="61">Australia +61</option></select></label>
    <label class="tl">WhatsApp number<input class="tf" name="phone" inputmode="tel" placeholder="300 1234567" autocomplete="tel-national"></label>
  </div>
  <label class="tl">Pre-filled message (optional)<textarea class="tf" name="message" rows="3" placeholder="Hi! I saw your post and would like to know more."></textarea></label>
  <label class="tl">Your link<input class="tf" id="wa-link" readonly></label>
  <div class="tactions"><button type="button" class="tbtn" id="wa-copy">Copy link</button><a class="tbtn ghost" id="wa-open" href="#" target="_blank" rel="noopener">Test it</a></div>
</form>
<div class="tool-card qr-card"><div id="wa-qr" class="qr"></div><button type="button" class="tbtn ghost" id="wa-png">Download QR (PNG)</button></div>""",
    "guide": """
<h2>Why a WhatsApp link beats "DM us"</h2>
<p>Every extra step between a customer and a conversation loses people. Asking them to save your number, open WhatsApp and type a message is three steps. A click-to-chat link opens the chat with your business straight away, with the first message already written, so they only have to press send.</p>
<h3>Where to use your link</h3>
<ul>
<li><b>Instagram and TikTok bio</b>, as your main link or inside a link-in-bio page.</li>
<li><b>Facebook and Instagram ads</b> with a "Send WhatsApp message" goal, or as the website link.</li>
<li><b>Google Business Profile</b>, your website header and email signature.</li>
<li><b>Printed QR codes</b> on flyers, menus, shop counters, delivery bags and business cards.</li>
</ul>
<h3>How to write a pre-filled message that converts</h3>
<p>Write it in your customer's voice and make it specific, so you know where the lead came from. For example: "Hi, I saw your Ramadan offer on Instagram. Is it still available?" Use a different message for each channel (ads, flyers, bio) and you will see at a glance which one brings the most chats.</p>
<h3>Number format</h3>
<p>Choose the country, then type the number without the leading zero. A Pakistani mobile 0300 1234567 becomes 92 300 1234567; a UAE mobile 050 123 4567 becomes 971 50 123 4567. The generator removes spaces, dashes and the leading zero for you.</p>
<h3>Printing the QR code</h3>
<p>Download the PNG and print it at least 2 × 2 cm (about 1 inch). Keep a white border around it and test it with two different phones before printing a large batch.</p>""",
    "faqs": [
      ("Does the link work without saving my number?", "Yes. wa.me links open a chat with any WhatsApp number without saving it as a contact."),
      ("Does it work with WhatsApp Business?", "Yes. The link works for both WhatsApp and WhatsApp Business numbers."),
      ("Can I change the message later?", "The message is part of the link, so create a new link if you want a different message. The QR code changes too."),
      ("Is the QR code free to print and use commercially?", "Yes. It's a plain QR code with no tracking and no expiry."),
    ],
    "related": ("Kavora Flows", "n8n automations that reply to WhatsApp leads and follow up automatically.", "/store/#kavora-flows"),
    "keywords": ["whatsapp link generator", "wa.me link", "whatsapp qr code", "click to chat whatsapp", "whatsapp link for instagram bio"],
  },
  {
    "slug": "profit-margin-calculator",
    "name": "Profit Margin Calculator",
    "short": "Work out margin, markup and the right selling price from your costs.",
    "title": "Profit Margin & Markup Calculator — Find Your Selling Price | Kavora Tools",
    "desc": "Free profit margin calculator. Enter cost and price to see margin and markup, or set a target margin to get the right selling price. Supports PKR, AED, SAR, USD.",
    "h1": "Profit margin and markup calculator",
    "icon": "📈",
    "ui": f"""
<form id="pm" class="tool-card" onsubmit="return false">
  <label class="tl">I want to<select class="tf" name="mode"><option value="price">Check my price</option><option value="margin">Price for a target margin</option><option value="markup">Price from a markup</option></select></label>
  <div class="tgrid2">
    <label class="tl">Cost per item<input class="tf" name="cost" type="number" min="0" step="any" value="1200"></label>
    <label class="tl">Currency{cur_select(default="PKR")}</label>
  </div>
  <label class="tl" id="pm-price-row">Selling price<input class="tf" name="price" type="number" min="0" step="any" value="2000"></label>
  <label class="tl" id="pm-target-row" hidden><span id="pm-target-label">Target margin (%)</span><input class="tf" name="target" type="number" min="0" step="any" value="40"></label>
  <label class="tl">Expected sales<input class="tf" name="qty" type="number" min="1" step="1" value="100"></label>
</form>
<div class="tool-card results" id="pm-out" aria-live="polite"></div>""",
    "guide": """
<h2>Margin and markup are not the same thing</h2>
<p>This is the most common pricing mistake in small businesses. Both start from the same profit, but they divide it by different numbers.</p>
<ul>
<li><b>Markup</b> is profit divided by <b>cost</b>. Buy at 1,000, sell at 1,500: profit 500, markup 50%.</li>
<li><b>Margin</b> is profit divided by <b>selling price</b>. Same example: 500 ÷ 1,500 = 33.3% margin.</li>
</ul>
<p>If you want a 50% margin and add 50% to your cost, you only get 33%. To reach a 50% margin, you need a 100% markup. The "price for a target margin" mode does this maths for you.</p>
<h3>What to include in your cost</h3>
<p>Your real cost per item is more than the purchase price. Add packaging, delivery you pay for, payment gateway or card fees, marketplace commission, returns and a share of ad spend. If you spend 50,000 on ads to sell 100 units, add 500 to each unit's cost before you check your margin.</p>
<h3>What is a good margin?</h3>
<p>It depends on the industry. Groceries often run on thin single-digit margins and rely on volume; fashion, beauty and handmade products often aim for 50% or more because returns and ad costs are high; digital products and software can reach 80–90% because each extra sale costs almost nothing. Compare yourself with businesses like yours, not with averages.</p>
<h3>Three ways to improve your margin</h3>
<ol>
<li><b>Raise prices slightly</b> and test. A 5% price rise often loses fewer customers than you fear.</li>
<li><b>Bundle</b> items so the average order is larger while delivery and payment costs stay the same.</li>
<li><b>Cut the hidden costs</b>: cheaper packaging, fewer returns through better product photos and descriptions, and ads aimed at buyers who already know what they want.</li>
</ol>""",
    "faqs": [
      ("How do I calculate profit margin?", "Profit margin = (selling price − cost) ÷ selling price × 100."),
      ("How do I calculate markup?", "Markup = (selling price − cost) ÷ cost × 100."),
      ("How do I price for a 40% margin?", "Divide your cost by 0.6 (that is, 1 − 0.40). A cost of 1,200 needs a price of 2,000."),
      ("Should I include tax in the selling price?", "No. Calculate margin on the price before VAT or sales tax, because the tax is not your money."),
    ],
    "related": ("Kavora Desk", "Keep sales, tasks and goals on your Mac desktop with live widgets.", "/desk/"),
    "keywords": ["profit margin calculator", "markup calculator", "selling price calculator", "margin vs markup", "how to calculate profit margin"],
  },
  {
    "slug": "vat-gst-calculator",
    "name": "VAT & GST Calculator",
    "short": "Add or remove VAT and sales tax with presets for the UAE, Saudi Arabia and Pakistan.",
    "title": "VAT & GST Calculator — UAE 5%, Saudi 15%, Pakistan | Kavora Tools",
    "desc": "Free VAT and sales tax calculator. Add tax to a price or extract it from a total, with quick presets for the UAE, Saudi Arabia, Pakistan and the UK. Works in any currency.",
    "h1": "VAT and GST calculator",
    "icon": "🧮",
    "ui": f"""
<form id="vat" class="tool-card" onsubmit="return false">
  <div class="presets" role="group" aria-label="Tax rate presets">
    <button type="button" class="chipb on" data-rate="5" data-cur="AED">UAE 5%</button>
    <button type="button" class="chipb" data-rate="15" data-cur="SAR">Saudi 15%</button>
    <button type="button" class="chipb" data-rate="18" data-cur="PKR">Pakistan 18%</button>
    <button type="button" class="chipb" data-rate="20" data-cur="GBP">UK 20%</button>
  </div>
  <label class="tl">Calculation<select class="tf" name="mode"><option value="add">Add tax to a price</option><option value="remove">Remove tax from a total</option></select></label>
  <div class="tgrid2">
    <label class="tl">Amount<input class="tf" name="amount" type="number" min="0" step="any" value="1000"></label>
    <label class="tl">Currency{cur_select(default="AED")}</label>
  </div>
  <label class="tl">Tax rate (%)<input class="tf" name="rate" type="number" min="0" step="any" value="5"></label>
  <p class="muted-s">Rates change. Check the current rate with your tax authority before filing.</p>
</form>
<div class="tool-card results" id="vat-out" aria-live="polite"></div>""",
    "guide": """
<h2>Adding tax and removing tax</h2>
<p>There are two everyday questions. <b>"What should I charge including tax?"</b> Multiply the price by (1 + rate). A 1,000 AED service with 5% UAE VAT becomes 1,050 AED. <b>"How much tax is inside this total?"</b> Divide the total by (1 + rate) to get the amount before tax, and the difference is the tax. A 1,050 AED receipt contains 1,000 AED plus 50 AED VAT.</p>
<p>A common mistake is to take 5% off a tax-inclusive total. 5% of 1,050 is 52.50, not 50, so your records would be wrong by 2.50 on every sale. Always divide, never subtract a percentage.</p>
<h3>Quick reference</h3>
<ul>
<li><b>United Arab Emirates:</b> standard VAT rate 5%.</li>
<li><b>Saudi Arabia:</b> standard VAT rate 15%.</li>
<li><b>Pakistan:</b> general sales tax on goods is commonly 18%; services are taxed by the provinces at their own rates, so check which applies to you.</li>
<li><b>United Kingdom:</b> standard VAT rate 20%.</li>
</ul>
<p>Rates and rules change, and some goods and services are zero-rated or exempt. Use this calculator for quick numbers and quotes, and confirm the rate for your product with your tax authority or accountant.</p>
<h3>Showing tax on invoices and price lists</h3>
<p>Business customers usually want to see the price before tax, the tax amount and the total on separate lines, together with your tax registration number. Consumers usually expect the final price including tax. If you sell to both, show the tax-inclusive price prominently and the breakdown on the invoice. Our free invoice generator does this for you.</p>""",
    "faqs": [
      ("How do I add 5% VAT to a price?", "Multiply the price by 1.05. For example, 200 × 1.05 = 210."),
      ("How do I remove VAT from a total?", "Divide the total by 1 plus the rate. For 5% VAT, divide by 1.05; the difference is the VAT."),
      ("What is the VAT rate in the UAE?", "The standard rate is 5%. Some supplies are zero-rated or exempt."),
      ("Is this calculator accurate for filing tax returns?", "It gives exact arithmetic, but you're responsible for using the correct rate for your product. Check with your tax authority or accountant."),
    ],
    "related": ("Kavora Kits", "Brand kits with ready-made invoice, quote and proposal designs.", "/store/#kavora-kits"),
    "keywords": ["vat calculator uae", "vat calculator", "gst calculator pakistan", "saudi vat calculator", "remove vat from price"],
  },
  {
    "slug": "utm-link-builder",
    "name": "UTM Link Builder",
    "short": "Tag your campaign links so you know exactly which post or ad brought each visitor.",
    "title": "Free UTM Link Builder with QR Code — Track Every Campaign | Kavora Tools",
    "desc": "Build UTM tracking links for Facebook, Instagram, TikTok, WhatsApp, Google Ads and email in seconds, with a QR code for print. See which campaigns bring visitors in Google Analytics.",
    "h1": "UTM link builder",
    "icon": "🔗",
    "ui": """
<form id="utm" class="tool-card" onsubmit="return false">
  <label class="tl">Page address<input class="tf" name="url" inputmode="url" placeholder="https://yourwebsite.com/offer" value=""></label>
  <div class="presets" role="group" aria-label="Quick presets">
    <button type="button" class="chipb" data-preset="facebook">Facebook ads</button><button type="button" class="chipb" data-preset="instagram">Instagram</button>
    <button type="button" class="chipb" data-preset="tiktok">TikTok</button><button type="button" class="chipb" data-preset="whatsapp">WhatsApp</button>
    <button type="button" class="chipb" data-preset="google">Google Ads</button><button type="button" class="chipb" data-preset="linkedin">LinkedIn</button>
    <button type="button" class="chipb" data-preset="newsletter">Email</button>
  </div>
  <div class="tgrid2">
    <label class="tl">Source (where)<input class="tf" name="source" placeholder="instagram"></label>
    <label class="tl">Medium (what kind)<input class="tf" name="medium" placeholder="social"></label>
  </div>
  <label class="tl">Campaign name<input class="tf" name="campaign" placeholder="winter_sale"></label>
  <div class="tgrid2">
    <label class="tl">Term (optional)<input class="tf" name="term" placeholder="keyword"></label>
    <label class="tl">Content (optional)<input class="tf" name="content" placeholder="video_a"></label>
  </div>
  <label class="tl">Your tracking link<textarea class="tf" id="utm-out" rows="3" readonly></textarea></label>
  <div class="tactions"><button type="button" class="tbtn" id="utm-copy">Copy link</button></div>
</form>
<div class="tool-card qr-card"><div id="utm-qr" class="qr"></div><button type="button" class="tbtn ghost" id="utm-png">Download QR (PNG)</button></div>""",
    "guide": """
<h2>What UTM links do</h2>
<p>When someone clicks a link to your website, analytics tools often can't tell whether they came from your Instagram story, a WhatsApp broadcast or a paid ad. UTM tags are small labels added to the end of the link that tell Google Analytics and most other tools exactly where the visit came from. They don't change the page; they only label the visit.</p>
<h3>The five tags</h3>
<ul>
<li><b>utm_source</b>: the platform, such as instagram, facebook, whatsapp or newsletter.</li>
<li><b>utm_medium</b>: the type of traffic, such as social, paid_social, cpc, email or qr.</li>
<li><b>utm_campaign</b>: the promotion, such as eid_sale or launch_week.</li>
<li><b>utm_term</b> (optional): the keyword for search ads.</li>
<li><b>utm_content</b> (optional): which version of the ad or post, such as video_a or carousel_b.</li>
</ul>
<h3>Rules that keep your reports clean</h3>
<ol>
<li><b>Use lowercase</b> everywhere. "Instagram" and "instagram" show up as two different sources. This builder converts to lowercase for you.</li>
<li><b>Use underscores instead of spaces.</b></li>
<li><b>Keep a naming list</b> and reuse the same words every time.</li>
<li><b>Never use UTM links inside your own website.</b> They restart the visit and break your reports.</li>
</ol>
<h3>Printed QR codes</h3>
<p>Set the medium to "qr" and the content to where the code is printed, such as "flyer" or "shop_counter". You'll finally know whether offline marketing brings visitors.</p>""",
    "faqs": [
      ("Do UTM links affect SEO?", "No. Search engines ignore UTM parameters on links shared in social media, ads and email."),
      ("Where do I see UTM results?", "In Google Analytics 4, open Reports → Acquisition → Traffic acquisition and choose Session source / medium or Session campaign."),
      ("Can I shorten a UTM link?", "Yes. Any link shortener works; the tags are kept when the short link redirects."),
      ("Which tags are required?", "Source, medium and campaign are the essentials. Term and content are optional."),
    ],
    "related": ("Kavora Ads", "Meta and TikTok ad packs with tested hooks and scripts.", "/store/#kavora-ads"),
    "keywords": ["utm builder", "utm link generator", "campaign url builder", "utm parameters", "google analytics utm"],
  },
]
