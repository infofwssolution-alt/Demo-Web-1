export interface SensorModel {
  id: string
  name: string
  tagline: string
  primaryUse: string
  tempRange: string
  accuracy: string
  batteryLife: string
  connectivity: string
  samplingInterval: string
  certifications: string[]
  dimensions: string
  ingressProtection: string
  description: string
  keyFeatures: string[]
}

export interface PricingTier {
  id: string
  name: string
  tagline: string
  priceMonthly: number | null
  priceAnnual: number | null
  sensorLimit: string
  reportingFrequency: string
  dataRetention: string
  popular?: boolean
  features: string[]
  ctaText: string
}

export interface CaseStudy {
  id: string
  company: string
  industry: string
  fleetSize: string
  headline: string
  summary: string
  metricPrimary: string
  metricPrimaryLabel: string
  metricSecondary: string
  metricSecondaryLabel: string
  quote: string
  quoteAuthor: string
  quoteRole: string
}

export interface FAQItem {
  id: string
  category: 'Hardware & Calibration' | 'Connectivity & Telemetry' | 'Compliance & Audits' | 'Pricing & Pilot Program'
  question: string
  answer: string
}

export const SENSOR_MODELS: SensorModel[] = [
  {
    id: 'kelvyn-probe',
    name: 'Kelvyn Probe',
    tagline: 'Cryogenic & Ultra-Low Cold Chain Telemetry',
    primaryUse: 'mRNA vaccines, biologics, blood banks, liquid nitrogen freezers',
    tempRange: '-80°C to +30°C',
    accuracy: '±0.1°C calibrated',
    batteryLife: '5 years (LiSOCl2 primary cell)',
    connectivity: 'LoRaWAN + NB-IoT with Bluetooth LE local diagnostic tap',
    samplingInterval: 'Configurable from 30 seconds to 15 minutes',
    certifications: ['NIST Traceable 3-point', 'ISO 17025', 'CE/FCC', 'FDA 21 CFR Part 11'],
    dimensions: '112 × 48 × 26 mm (with external 1.5m PT1000 RTD probe)',
    ingressProtection: 'IP68 fully submersible waterproof encasement',
    description: 'Designed for mission-critical ultra-low freezer applications where standard lithium cells fail. Features an external medical-grade platinum RTD element.',
    keyFeatures: [
      'Continuous reading through solid insulated freezer walls',
      'Encrypted internal flash buffer stores 60,000 readings offline',
      'Instant magnetic tap for quick technician visual LED status',
      'Dual-threshold excursion warning triggers before temperature breach occurs'
    ]
  },
  {
    id: 'kelvyn-reefer',
    name: 'Kelvyn Reefer',
    tagline: 'In-Transit Freight & Multi-Zone Cold Transport',
    primaryUse: 'Refrigerated trucks, intermodal containers, air cargo dry shippers',
    tempRange: '-30°C to +50°C',
    accuracy: '±0.15°C / ±2% RH humidity',
    batteryLife: 'Rechargeable 180-day backup + solar & 12V/24V vehicle harness sync',
    connectivity: 'Global LTE-M / Cat-M1 with integrated multi-GNSS tracking and fallback mesh',
    samplingInterval: '1-minute motion-active, 10-minute stationary',
    certifications: ['DO-160 Section 21 (FAA compliant)', 'EU GDP Guidelines', 'RoHS'],
    dimensions: '142 × 82 × 34 mm (ruggedized polycarbonate housing with magnetic mount)',
    ingressProtection: 'IP67 dust-tight and high-pressure spray resistant',
    description: 'Autonomous freight telemetry unit coupling micro-kelvin thermal logging with geofenced location, door-open optical detection, and 3-axis impact measurement.',
    keyFeatures: [
      'Automatic offline data upload upon cellular reconnect with zero data gaps',
      'Geofenced custody transfer alert triggers automatically upon arrival at pharma dock',
      'Door tamper and shock event timestamping cross-referenced with thermal spikes',
      'FAA-certified automated airplane flight-mode sensor disablement'
    ]
  },
  {
    id: 'kelvyn-vault',
    name: 'Kelvyn Vault',
    tagline: 'Warehouse, Walk-In Chiller & Distribution Hub Node',
    primaryUse: 'Central distribution centers, pharma cold rooms, hospital pharmacies',
    tempRange: '-40°C to +70°C',
    accuracy: '±0.1°C / ±1.5% RH',
    batteryLife: '10 years (User-replaceable commercial AA lithium cells)',
    connectivity: 'Long-range Sub-GHz Kelvyn Mesh (up to 1.2km indoor penetration)',
    samplingInterval: '60 seconds continuous',
    certifications: ['NIST Traceable', 'USP <1079>', 'HACCP Grade', 'ISO 9001'],
    dimensions: '96 × 96 × 28 mm (wall-bracket click mount with tamper switch)',
    ingressProtection: 'IP65 washdown rated',
    description: 'Zero-maintenance facility-wide thermal mapping and continuous monitoring. Penetrates dense pallet racks, steel cladding, and multi-floor distribution facilities.',
    keyFeatures: [
      'Self-healing mesh topology relays data through adjacent nodes to central gateway',
      'Thermal mapping mode automatically calculates Mean Kinetic Temperature (MKT)',
      'Digital e-paper status badge visible to floor supervisors without opening portal',
      'Annual recalibration kit with hot-swappable pre-calibrated sensor caps'
    ]
  }
]

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For regional pharmacies, small clinics, and pilot storage sites.',
    priceMonthly: 18,
    priceAnnual: 14,
    sensorLimit: 'Up to 25 sensors',
    reportingFrequency: '15-minute telemetry intervals',
    dataRetention: '1 year cryptographic audit log',
    features: [
      'Kelvyn Cloud Dashboard access (up to 5 users)',
      'SMS and Email excursion alerts',
      'Automated weekly PDF compliance digest',
      'Standard 8×5 business hours email support',
      'Full hardware warranty with advance replacement',
      'Standard NIST-traceable digital calibration certs'
    ],
    ctaText: 'Start 30-Day Pilot'
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For mid-size pharmaceutical distributors and 3PL cold logistics providers.',
    priceMonthly: 14,
    priceAnnual: 11,
    sensorLimit: '26 to 250 sensors',
    reportingFrequency: '2-minute high-frequency intervals',
    dataRetention: '3 years 21 CFR Part 11 compliant data',
    popular: true,
    features: [
      'Unlimited user accounts with Role-Based Access Control (RBAC)',
      'Triple-redundant alerts: SMS, WhatsApp, Phone call escalation',
      'Automated FDA 21 CFR Part 11 & EU GDP audit pack export',
      'Live in-transit freight map & geofenced depot triggers',
      'REST API & Webhooks for ERP / WMS integration (SAP, Manhattan)',
      'Priority 24/7 technical support with 1-hour critical response SLA'
    ],
    ctaText: 'Deploy Growth Pilot'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For multinational biopharma logistics, global cold chains, and clinical trials.',
    priceMonthly: null,
    priceAnnual: null,
    sensorLimit: '250+ sensors (unlimited)',
    reportingFrequency: 'Sub-minute continuous telemetry stream',
    dataRetention: '10 years immutable encrypted archive',
    features: [
      'Dedicated Customer Success Engineer & Solutions Architect',
      'Custom ERP/TMS bidirectional pipeline engineering',
      'On-site annual NIST recalibration service and physical sensor swap',
      'Custom SLA guarantees (99.99% uptime with financial penalty backed)',
      'Private cloud or single-tenant VPC deployment options',
      'Custom compliance validation documentation (IQ / OQ / PQ execution packs)'
    ],
    ctaText: 'Talk to Engineering'
  }
]

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'apex-biopharma',
    company: 'Apex Biopharma Distribution',
    industry: 'Pharmaceutical Logistics',
    fleetSize: '14 Central Hubs, 420 Refrigerated Reefers',
    headline: 'Eliminated $1.4M in thermal excursion batch write-offs in 6 months.',
    summary: 'Apex distributes temperature-critical specialty biologics across 18 states. Previously relying on USB passive loggers, excursion notifications arrived days after receipt. Kelvyn deployed 850 Kelvyn Reefer and Vault sensors, integrating live excursion warnings directly into their SAP logistics dispatch.',
    metricPrimary: '38%',
    metricPrimaryLabel: 'Reduction in annual spoilage losses',
    metricSecondary: '< 4 min',
    metricSecondaryLabel: 'Mean time to resolve compressor trips',
    quote: 'Before Kelvyn, we discovered temperature excursions after the pallet was unloaded at the hospital. Now, our dispatch catches a reefer door leak before the core temperature rises by a tenth of a degree.',
    quoteAuthor: 'Dr. Marcus Vance',
    quoteRole: 'VP of Quality Assurance & Logistics, Apex Biopharma'
  },
  {
    id: 'nordic-cryo',
    company: 'Nordic Cryo Logistics',
    industry: 'Vaccine & Cell Therapy Transit',
    fleetSize: '65 Ultra-Cold Mobile Storage Pods',
    headline: 'Zero temperature breaches across 1.2M delicate mRNA vaccine doses.',
    summary: 'Transporting pediatric vaccines and mRNA therapeutics at -80°C requires zero margin for failure. Nordic Cryo deployed the Kelvyn Probe system across all active cryogenic dry-ice dry shippers with continuous LTE-M telemetry.',
    metricPrimary: '100%',
    metricPrimaryLabel: 'Audit pass rate across 42 health authority inspections',
    metricSecondary: '1.2M+',
    metricSecondaryLabel: 'Doses delivered with zero excursion claims',
    quote: 'Regulatory audits used to take four days of manual CSV merging and forensic validation. With Kelvyn, our QA team generates an audit-ready 21 CFR Part 11 PDF package in 12 seconds.',
    quoteAuthor: 'Astrid Lindholm',
    quoteRole: 'Head of Cold Chain Compliance, Nordic Cryo'
  },
  {
    id: 'freshvault-cold-storage',
    company: 'FreshVault Logistics Network',
    industry: 'Food & Beverage Cold Storage',
    fleetSize: '2.8M sq ft of refrigerated warehousing',
    headline: 'Saved 92% of floor staff time previously spent on manual HACCP temperature clipboard logs.',
    summary: 'With 16 walk-in freezers across four interstate distribution terminals, FreshVault warehouse technicians spent two hours every shift manually recording clipboard logs. Kelvyn Vault nodes eliminated manual rounds while improving audit fidelity.',
    metricPrimary: '92%',
    metricPrimaryLabel: 'Reduction in manual logging overhead',
    metricSecondary: '100%',
    metricSecondaryLabel: 'Automated continuous HACCP compliance',
    quote: 'Kelvyn paid for itself in the first 90 days purely on saved labor hours. The automated ammonia leak detection and door-left-ajar alerts were an unexpected lifesaver.',
    quoteAuthor: 'Robert Chen',
    quoteRole: 'Director of Facility Operations, FreshVault'
  }
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Hardware & Calibration',
    question: 'How accurate are Kelvyn sensors and how are they calibrated?',
    answer: 'Every Kelvyn sensor is individually factory-calibrated against NIST-traceable reference standards to an accuracy of ±0.1°C across the operational range. Each sensor ships with a serialized ISO/IEC 17025 accredited calibration certificate linked directly to its digital QR code and cloud record.'
  },
  {
    id: 'faq-2',
    category: 'Hardware & Calibration',
    question: 'What is the real-world battery life and what happens when it runs low?',
    answer: 'Kelvyn Vault sensors operate for up to 10 years on internal lithium cells; Kelvyn Probe operates for 5 years; and Kelvyn Reefer utilizes a 180-day rechargeable lithium battery with continuous vehicle power sync. The Kelvyn Cloud platform triggers predictive maintenance alerts when battery capacity falls below 20%, allowing scheduled replacement months before failure.'
  },
  {
    id: 'faq-3',
    category: 'Hardware & Calibration',
    question: 'Can Kelvyn sensors withstand harsh washdowns and cryogenic environments?',
    answer: 'Yes. Kelvyn Probe and Reefer hardware are IP67/IP68 rated with chemically resistant fluoropolymer gaskets, tested against sanitizing chemical washes, deep steam cycles, and continuous operation in liquid nitrogen vapor (-80°C).'
  },
  {
    id: 'faq-4',
    category: 'Hardware & Calibration',
    question: 'How does recalibration work without causing downtime?',
    answer: 'Kelvyn provides an Advance Hot-Swap Calibration program. Sixty days before your annual calibration expires, pre-calibrated replacement sensor heads arrive at your facility with return shipping labels. Swap the module in seconds with zero system interruption.'
  },
  {
    id: 'faq-5',
    category: 'Connectivity & Telemetry',
    question: 'What cellular technologies do Kelvyn sensors use?',
    answer: 'Kelvyn Reefer and Gateway nodes utilize multi-carrier LTE-M and NB-IoT modems with fallback to 2G/EGPRS, supporting roaming across 180+ global carriers without SIM swaps or regional configuration.'
  },
  {
    id: 'faq-6',
    category: 'Connectivity & Telemetry',
    question: 'What happens if a vehicle or shipment enters a cellular dead zone?',
    answer: 'Zero data is lost. Kelvyn hardware features onboard industrial NOR flash memory storing up to 60,000 timestamped readings locally. As soon as cellular connectivity resumes, the unit immediately uploads the buffered data in chronological sequence.'
  },
  {
    id: 'faq-7',
    category: 'Connectivity & Telemetry',
    question: 'Can sensors penetrate thick concrete cold rooms or insulated reefer walls?',
    answer: 'Yes. For facilities, Kelvyn Vault operates on Sub-GHz mesh frequencies (868/915 MHz) which penetrate steel-reinforced concrete up to 4x better than standard 2.4 GHz Wi-Fi or Bluetooth. For ultra-low freezers, the Kelvyn Probe routes a flat ribbon cable through the door gasket without breaking the seal.'
  },
  {
    id: 'faq-8',
    category: 'Connectivity & Telemetry',
    question: 'Can we integrate telemetry data directly into SAP or our internal WMS?',
    answer: 'Yes. Kelvyn provides a high-throughput REST API with OpenAPI specifications and configurable outgoing Webhooks. You can stream real-time temperature, location, and alert payloads straight into SAP, Manhattan Associates, Oracle NetSuite, or internal data lakes.'
  },
  {
    id: 'faq-9',
    category: 'Compliance & Audits',
    question: 'Does Kelvyn comply with FDA 21 CFR Part 11 and EU GDP?',
    answer: 'Yes. Kelvyn architecture includes cryptographic write-once audit logs, SHA-256 tamper-evident record hashing, multi-factor authentication, digital sign-off workflows, and automated system validation protocols complying with FDA 21 CFR Part 11, EU Annex 11, and Good Distribution Practice (GDP).'
  },
  {
    id: 'faq-10',
    category: 'Compliance & Audits',
    question: 'How does Kelvyn assist during unexpected regulatory health audits?',
    answer: 'Auditors can be granted read-only compliance inspector access, or QA teams can generate batch-specific compliance certificates in PDF format within seconds, including time-series graphs, calibration hashes, MKT calculations, and corrective action sign-offs.'
  },
  {
    id: 'faq-11',
    category: 'Compliance & Audits',
    question: 'How does Mean Kinetic Temperature (MKT) calculation work?',
    answer: 'The Kelvyn platform automatically computes validated MKT across customizable batch timeframes according to the Haynes equation (USP <1079>), providing the exact thermal impact of micro-excursions on pharmaceutical shelf life.'
  },
  {
    id: 'faq-12',
    category: 'Compliance & Audits',
    question: 'What security certifications does Kelvyn hold?',
    answer: 'Kelvyn is SOC 2 Type II certified and ISO 27001 certified. All telemetry data is encrypted in transit using TLS 1.3 and at rest using AES-256 with key management stored in hardware security modules (HSM).'
  },
  {
    id: 'faq-13',
    category: 'Pricing & Pilot Program',
    question: 'How does the 30-Day Free Pilot program work?',
    answer: 'Qualified pharmaceutical and cold-logistics operators receive a pilot kit containing 10 pre-configured Kelvyn sensors and a cellular gateway. You test them in your actual facilities for 30 days with full software access and zero financial commitment.'
  },
  {
    id: 'faq-14',
    category: 'Pricing & Pilot Program',
    question: 'Is hardware purchased upfront or included in the monthly fee?',
    answer: 'Kelvyn operates on a complete Hardware-as-a-Service (HaaS) model. Hardware, cellular connectivity, platform access, automated calibration swaps, and lifetime hardware replacements are all included in the per-sensor monthly fee with zero capital expenditure.'
  },
  {
    id: 'faq-15',
    category: 'Pricing & Pilot Program',
    question: 'What is the hardware warranty and replacement timeline?',
    answer: 'All active subscriptions include an unconditional lifetime hardware warranty. If a sensor experiences hardware failure or physical damage, advance replacements are dispatched with overnight priority freight.'
  },
  {
    id: 'faq-16',
    category: 'Pricing & Pilot Program',
    question: 'Can we add or remove sensors as seasonal demand fluctuates?',
    answer: 'Yes. Growth and Enterprise contracts support seasonal flexing, allowing temperature-monitored refrigerated vehicle fleets to scale up sensor pools during peak summer distribution quarters and scale back in winter.'
  },
  {
    id: 'faq-17',
    category: 'Pricing & Pilot Program',
    question: 'What support SLAs are provided?',
    answer: 'Starter plans include 8×5 business day email support with 4-hour response SLAs. Growth plans include 24/7 priority support with 1-hour critical response SLAs. Enterprise plans feature dedicated phone hotlines and 15-minute response times for critical telemetry interruptions.'
  },
  {
    id: 'faq-18',
    category: 'Compliance & Audits',
    question: 'How are false alarms prevented during normal door openings or defrost cycles?',
    answer: 'Kelvyn intelligent alerting allows configurable alarm delay timers and door-sensor correlation. Brief thermal rises from standard freezer door access do not trigger emergency dispatches unless the temperature exceeds sustained regulatory threshold windows.'
  },
  {
    id: 'faq-19',
    category: 'Hardware & Calibration',
    question: 'How long does installation take per warehouse or vehicle?',
    answer: 'Installation takes under three minutes per sensor. Sensors feature industrial neodymium magnetic brackets and screw anchors; simply tap the sensor with your technician smartphone NFC or press the sync button to pair instantly.'
  },
  {
    id: 'faq-20',
    category: 'Connectivity & Telemetry',
    question: 'Who owns our facility temperature data?',
    answer: 'You own 100% of your data. Kelvyn never monetizes or shares customer telemetry. Enterprise customers can configure automatic daily S3 or Azure Blob archive exports with complete cryptographic verification.'
  }
]

export const COMPANY_INFO = {
  name: 'Kelvyn Technologies Inc.',
  tagline: 'Every degree, accounted for.',
  foundedYear: 2022,
  teamSize: '48 systems engineers, IoT architects, and QA specialists',
  headquarters: {
    address: 'Neugasse 29, 8005 Zürich, Switzerland',
    secondaryOffice: '245 Main Street, 11th Floor, Cambridge, MA 02142, USA'
  },
  contact: {
    salesEmail: 'sales@kelvyn.io',
    supportEmail: 'ops@kelvyn.io',
    emergencyHotline: '+1 (800) 535-8960',
    internationalPhone: '+41 44 214 88 00',
    businessHours: 'Monday – Friday: 07:00 – 19:00 CET / EST (24/7/365 Emergency Dispatch for active alerts)'
  },
  stats: {
    monitoredPalletsValue: '$180M+',
    telemetryUptime: '99.998%',
    complianceAuditPass: '100%',
    meanAlertDispatchTime: '< 3.4s'
  }
}
