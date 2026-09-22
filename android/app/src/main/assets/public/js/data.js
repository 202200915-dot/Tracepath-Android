/* Tracepath — roadmap content (stages, projects, certifications).
   Edit this file to change the curriculum. Resource catalogue lives in resources.js. */
(function () {
  "use strict";

  const stage = (num, o) => {
    const id = "s" + num;
    return Object.assign({ num, id }, o, {
      topics: (o.topics || []).map(([slug, title, link]) => ({ id: id + "." + slug, title, link: link || null })),
      labs: (o.labs || []).map(([slug, title]) => ({ id: id + ".lab." + slug, title })),
    });
  };

  const STAGES = [
    stage(1, {
      title: "Networking fundamentals", short: "Networking", icon: "network", hue: "#0F8F8A", hours: "40–60 h",
      summary: "How data moves between devices. This is the base for every later stage.",
      outcome: "You can trace a packet from a laptop to a server, subnet by hand, and read a capture in Wireshark.",
      topics: [
        ["osi", "OSI & TCP/IP"], ["ip", "IPv4 / IPv6"], ["subnet", "Subnetting"], ["dns", "DNS / DHCP"],
        ["swrt", "Switching & routing"], ["vlan", "VLAN"], ["nat", "NAT"], ["acl", "ACL"], ["wireshark", "Wireshark"],
      ],
      labs: [
        ["subnet", "Subnet ten networks by hand, then check them with a calculator"],
        ["capture", "Capture a DNS lookup and a TCP handshake in Wireshark"],
        ["lan", "Build a small LAN with DHCP and DNS in Packet Tracer"],
        ["nat", "Configure NAT and a basic ACL on a router"],
      ],
      flow: {
        learn: { text: "Work through a structured beginner course, then fill gaps with videos.", res: ["skillsforall", "jeremy"] },
        practice: { text: "Drill subnetting every day and rebuild each topic in Packet Tracer.", res: ["packettracer", "practicalnetworking"] },
        lab: { text: "Capture real traffic and build a small LAN with DHCP, DNS and NAT.", res: ["wiresharkdocs", "packettracer"] },
        review: { text: "Quiz yourself on OSI, addressing and subnetting. Explain each topic out loud." },
        project: { text: "Mini-project: draw and document a small-office network with an addressing plan." },
        cert: null,
      },
      picks: {
        ar: ["ar-net-plus", "ar-ccna-walid", "ar-wireshark"],
        free: ["skillsforall", "practicalnetworking", "mahara"],
        paid: ["udemy-ccna", "coursera-net"],
        labs: ["packettracer", "wiresharkdocs", "thm"],
        docs: ["wiresharkdocs", "packetlife"],
      },
      certIds: [],
    }),

    stage(2, {
      title: "CCNA", short: "CCNA", icon: "route", hue: "#2B6BE0", hours: "100–150 h",
      summary: "Cisco-flavoured routing and switching, built up until you can configure and troubleshoot a multi-site network.",
      outcome: "You can configure VLANs, STP and OSPF, and fix a broken network methodically. You are ready to book CCNA 200-301.",
      topics: [
        ["exam", "CCNA 200-301 exam blueprint"], ["rs", "Routing & switching"], ["vlanstp", "VLAN / STP"], ["ospf", "OSPF"],
        ["ip", "IPv4 / IPv6"], ["ts", "Network troubleshooting"], ["pt", "Cisco Packet Tracer"], ["emu", "GNS3 / EVE-NG"],
      ],
      labs: [
        ["vlan", "VLANs, trunking and inter-VLAN routing"],
        ["ospf", "Single-area OSPF across three routers"],
        ["stp", "STP root bridge election and PortFast"],
        ["fix", "Troubleshoot five deliberately broken configurations"],
      ],
      flow: {
        learn: { text: "Follow one full CCNA course from start to finish. Do not hop between three.", res: ["jeremy", "netacad", "ciscopress"] },
        practice: { text: "Configure every command yourself in Packet Tracer as you watch.", res: ["packettracer", "packetlife"] },
        lab: { text: "Routing, VLAN and OSPF labs, then a larger topology in GNS3 or EVE-NG.", res: ["gns3", "eveng"] },
        review: { text: "Practice exams until you score consistently above 85%.", res: ["boson", "udemy-ccna"] },
        project: { text: "Build the Enterprise Network Lab.", projectId: "p1" },
        cert: { text: "Book CCNA 200-301 when your practice scores are steady.", certId: "ccna" },
      },
      picks: {
        ar: ["ar-ccna-attaalla", "ar-ccna-elzoghbi", "ar-netacad-pt"],
        free: ["jeremy", "skillsforall", "packetlife"],
        paid: ["udemy-ccna", "ciscopress", "boson"],
        labs: ["packettracer", "gns3", "eveng"],
        docs: ["cisco-lnet"],
      },
      certIds: ["ccna"],
    }),

    stage(3, {
      title: "Linux", short: "Linux", icon: "terminal", hue: "#B5731A", hours: "40–60 h",
      summary: "The operating system behind servers, cloud instances and most security tools.",
      outcome: "You can administer a Linux server from the shell, lock down SSH, and read the logs.",
      topics: [
        ["cmds", "Linux commands"], ["perms", "Users & permissions"], ["procs", "Processes"], ["svc", "Services"],
        ["ssh", "SSH"], ["net", "Networking on Linux"], ["fw", "Firewall"], ["logs", "Logs"], ["bash", "Bash"],
      ],
      labs: [
        ["ssh", "Set up key-only SSH login on a VM"],
        ["bash", "Write a Bash script that counts failed logins in the auth log"],
        ["fw", "Build an allow-list firewall with ufw or nftables"],
        ["bandit", "Finish OverTheWire Bandit levels 0 to 15"],
      ],
      flow: {
        learn: { text: "Learn the shell and the filesystem, then permissions and services.", res: ["linuxjourney", "lf-intro", "tlcl"] },
        practice: { text: "Live in the terminal: use a Linux VM for everything for two weeks.", res: ["bandit", "freecodecamp"] },
        lab: { text: "Harden a server: SSH keys, firewall, log review.", res: ["thm", "hackthebox"] },
        review: { text: "Explain file permissions and a systemd unit from memory." },
        project: { text: "Mini-project: a hardened Linux jump host with a written checklist." },
        cert: null,
      },
      picks: {
        ar: ["ar-linux-plus", "ar-linux-coursera"],
        free: ["linuxjourney", "tlcl", "mahara"],
        paid: ["lf-intro", "lf-training", "udemy-linux"],
        labs: ["bandit", "thm", "hackthebox"],
        docs: ["man7"],
      },
      certIds: [],
    }),

    stage(4, {
      title: "Network security", short: "Network security", icon: "shield", hue: "#C24A3A", hours: "60–80 h",
      summary: "Protect and monitor networks: firewalls, VPNs, segmentation and intrusion detection.",
      outcome: "You can design a segmented network, stand up a VPN, and explain what an IDS alert means.",
      topics: [
        ["fw", "Firewalls"], ["vpn", "VPN"], ["ids", "IDS / IPS"], ["seg", "Network segmentation"],
        ["proto", "Secure protocols"], ["wireshark", "Wireshark for security"], ["siem", "SIEM basics"],
      ],
      labs: [
        ["seg", "Segment LAN, DMZ and guest networks with OPNsense or pfSense"],
        ["vpn", "Build a WireGuard VPN between two machines"],
        ["ids", "Trigger and read a Suricata alert"],
        ["tls", "Tell cleartext from encrypted traffic in Wireshark"],
      ],
      flow: {
        learn: { text: "Learn security concepts alongside the network you already know.", res: ["cloudflare-learn", "messer", "skillsforall"] },
        practice: { text: "Scan your own lab with Nmap and read what each port tells you.", res: ["nmapbook", "thm"] },
        lab: { text: "Firewall with three zones, a VPN, and an IDS watching the traffic.", res: ["opnsense", "suricata"] },
        review: { text: "Draw a segmented network from memory and defend each rule." },
        project: { text: "Extend the Enterprise Network Lab with a firewall, DMZ and VPN.", projectId: "p1" },
        cert: { text: "Optional: CompTIA Security+ adds recognised breadth.", certId: "secplus" },
      },
      picks: {
        ar: ["ar-netriders", "ar-wireshark-coursera", "ar-free4arab"],
        free: ["cloudflare-learn", "nmapbook", "skillsforall"],
        paid: ["messer", "comptia-official", "thm"],
        labs: ["opnsense", "suricata", "thm"],
        docs: ["wireguard", "wiresharkdocs"],
      },
      certIds: ["secplus"],
    }),

    stage(5, {
      title: "AWS and cloud", short: "AWS / Cloud", icon: "cloud", hue: "#2493D6", hours: "80–120 h",
      summary: "Cloud basics, then the AWS building blocks: networking, compute, storage, identity and logging.",
      outcome: "You can design a small AWS environment with private subnets and reason about how it is exposed.",
      topics: [
        ["fund", "Cloud fundamentals"], ["clf", "AWS Cloud Practitioner"], ["saa", "AWS Solutions Architect Associate"],
        ["ec2", "EC2"], ["s3", "S3"], ["vpc", "VPC"], ["subnets", "Subnets"], ["rt", "Route tables"],
        ["sg", "Security groups"], ["nacl", "NACL"], ["iam", "IAM"], ["ct", "CloudTrail"], ["cw", "CloudWatch"],
      ],
      labs: [
        ["budget", "Set a billing budget alert before you build anything"],
        ["vpc", "Build a VPC with public and private subnets and route tables"],
        ["ssm", "Reach a private EC2 instance through Session Manager"],
        ["s3", "Lock down an S3 bucket with block public access and a policy"],
        ["logs", "Turn on CloudTrail and add a CloudWatch alarm"],
      ],
      flow: {
        learn: { text: "Start with the free official path, then follow one Solutions Architect course.", res: ["skillbuilder", "freecodecamp", "udemy-aws"] },
        practice: { text: "Rebuild every diagram by hand in your own AWS account.", res: ["aws-free-tier", "aws-docs"] },
        lab: { text: "VPC, private EC2, S3 policy, CloudTrail and CloudWatch.", res: ["aws-workshops"] },
        review: { text: "Timed practice exams. Read the explanation of every wrong answer.", res: ["tutorialsdojo"] },
        project: { text: "Build Secure AWS Infrastructure.", projectId: "p2" },
        cert: { text: "Cloud Practitioner first, then Solutions Architect Associate.", certId: "clf" },
      },
      picks: {
        ar: ["ar-aws-clf", "ar-aws-saa", "ar-skillbuilder"],
        free: ["skillbuilder", "freecodecamp", "aws-workshops"],
        paid: ["udemy-aws", "tutorialsdojo", "coursera-aws"],
        labs: ["aws-workshops", "aws-free-tier"],
        docs: ["aws-docs", "aws-wellarch"],
      },
      certIds: ["clf", "saa"],
    }),

    stage(6, {
      title: "Cloud security", short: "Cloud security", icon: "lock", hue: "#4F5BD5", hours: "60–100 h",
      summary: "Apply security thinking to the cloud: identity, encryption, logging and response.",
      outcome: "You can review an AWS account for risky settings, fix them, and explain why each fix matters.",
      topics: [
        ["iam", "IAM & least privilege"], ["net", "Cloud network security"], ["enc", "Encryption"], ["kms", "KMS"],
        ["sec", "Secrets"], ["log", "Logging"], ["mon", "Monitoring"], ["ir", "Incident response"], ["vuln", "Vulnerability management"],
      ],
      labs: [
        ["iam", "Write a least-privilege IAM policy and test it in the policy simulator"],
        ["kms", "Encrypt S3 and EBS with a customer-managed KMS key"],
        ["secret", "Store and rotate a secret in Secrets Manager"],
        ["flaws", "Complete flaws.cloud levels 1 to 3"],
        ["prowler", "Scan your account with Prowler and fix three findings"],
      ],
      flow: {
        learn: { text: "Read the IAM best practices and the Security pillar, then take a security path.", res: ["aws-iam-bp", "aws-secpillar", "ms-learn"] },
        practice: { text: "Break your own lab account on purpose, then fix it.", res: ["prowler", "flaws"] },
        lab: { text: "Attack-and-defend scenarios in an isolated account.", res: ["cloudgoat", "stratus"] },
        review: { text: "Explain least privilege, key rotation and the shared responsibility model in plain words." },
        project: { text: "Finish Secure AWS Infrastructure.", projectId: "p2" },
        cert: { text: "Later: AWS Security Specialty once you have real hands-on time.", certId: "awsscs" },
      },
      picks: {
        ar: ["ar-skillbuilder"],
        arNote: "Only the official AWS material has an Arabic version at this level, and it stops at the fundamentals. For IAM policy detail, KMS and incident response, the English resources below are the recommendation.",
        free: ["aws-iam-bp", "flaws", "ms-learn"],
        paid: ["udemy-cloudsec", "thm", "tutorialsdojo"],
        labs: ["flaws", "cloudgoat", "prowler"],
        docs: ["aws-secpillar", "aws-iam-bp"],
      },
      certIds: ["awsscs"],
    }),

    stage(7, {
      title: "SIEM and SOC", short: "SIEM / SOC", icon: "radar", hue: "#A8398F", hours: "80–120 h",
      summary: "Collect logs, detect suspicious behaviour, investigate alerts and hunt for threats.",
      outcome: "You can onboard log sources, write a detection, and work an alert from triage to a short report.",
      topics: [
        ["win", "Windows logs"], ["lin", "Linux logs"], ["syslog", "Syslog"], ["siem", "SIEM concepts"], ["splunk", "Splunk"],
        ["wazuh", "Wazuh"], ["sentinel", "Microsoft Sentinel"], ["det", "Detection rules"], ["ir", "Incident response"], ["hunt", "Threat hunting"],
      ],
      labs: [
        ["wazuh", "Send Linux and Windows logs into Wazuh"],
        ["splunk", "Build three searches and a dashboard in Splunk"],
        ["rule", "Write a brute-force detection rule and trigger it"],
        ["case", "Investigate one guided case from alert to report"],
        ["kql", "Run a KQL query in a Microsoft Sentinel workspace"],
      ],
      flow: {
        learn: { text: "Learn log sources first, then one SIEM properly. Splunk or Wazuh is enough to start.", res: ["splunk-free", "wazuh", "mitre"] },
        practice: { text: "Query logs daily. Map every alert to a MITRE ATT&CK technique.", res: ["splunk-bots", "sigma"] },
        lab: { text: "Guided investigations and attack simulations against your own lab.", res: ["letsdefend", "btlo", "atomic"] },
        review: { text: "Write a one-page incident report for a lab case." },
        project: { text: "Build Cloud Security Monitoring.", projectId: "p3" },
        cert: { text: "Microsoft SC-200 lines up with SOC analyst roles.", certId: "sc200" },
      },
      picks: {
        ar: ["ar-netriders-soc", "ar-splunk-udemy"],
        arNote: "Arabic covers SOC fundamentals and Splunk well. For Wazuh, Sentinel and detection engineering, no Arabic course could be confirmed — use the English and official resources below.",
        free: ["splunk-free", "wazuh", "mitre"],
        paid: ["udemy-soc", "letsdefend", "thm"],
        labs: ["splunk-bots", "btlo", "atomic"],
        docs: ["sentinel-docs", "sigma", "wazuh"],
      },
      certIds: ["sc200"],
    }),

    stage(8, {
      title: "Projects and career", short: "Projects & career", icon: "briefcase", hue: "#23486B", hours: "60+ h",
      summary: "Turn what you learned into proof: three portfolio projects, a clean CV and a plan for internships.",
      outcome: "You have a public portfolio, a sharp CV and LinkedIn, and a short list of internships you can apply to.",
      topics: [
        ["p1", "Enterprise Network Lab", "project:p1"], ["p2", "Secure AWS Infrastructure", "project:p2"],
        ["p3", "Cloud Security Monitoring", "project:p3"], ["portfolio", "Portfolio"], ["cv", "CV / LinkedIn"], ["intern", "Internship preparation"],
      ],
      labs: [],
      flow: {
        learn: { text: "Study how junior security roles are described and which skills they list.", res: ["roadmapsh"] },
        practice: { text: "Write a README for each project as if a hiring manager will read only that." },
        project: { text: "Publish all three projects with diagrams and lessons learned.", res: ["github-pages"] },
        review: { text: "Ask someone to review your CV and portfolio. Fix what they misread." },
        cert: null,
      },
      picks: { ar: ["ar-netriders-pre"], free: ["roadmapsh", "github-pages"], paid: [], labs: [], docs: [] },
      certIds: [],
    }),
  ];

  const PROJECTS = [
    {
      id: "p1", n: 1, title: "Enterprise network lab", icon: "network", stages: [1, 2, 4], difficulty: "Intermediate", time: "20–30 h",
      objective: "Design, build and document a multi-site enterprise network with segmentation, routing, NAT, ACLs and a secured edge.",
      prerequisites: ["Subnetting and VLSM", "VLANs, trunking and inter-VLAN routing", "OSPF basics", "Packet Tracer or GNS3 running on your machine"],
      skills: ["Network design", "Addressing plans", "Routing and switching", "Access control", "Troubleshooting", "Documentation"],
      tech: ["Cisco Packet Tracer", "GNS3 or EVE-NG", "Wireshark", "OPNsense or pfSense (optional)"],
      steps: [
        ["Write the requirements", "Two branch sites and one head office, 4 VLANs each, guest Wi-Fi, a DMZ web server."],
        ["Plan the addressing", "Give every VLAN a subnet using VLSM. Put the plan in a table."],
        ["Draw the topology", "Layer 2 and layer 3 views, with device names and interface labels."],
        ["Build the switching layer", "VLANs, trunks, STP with a chosen root bridge, port security on access ports."],
        ["Build the routing layer", "Inter-VLAN routing and OSPF between sites, with a default route to the internet edge."],
        ["Add DHCP and DNS", "DHCP per VLAN with relay, and an internal DNS server."],
        ["Add NAT and ACLs", "PAT at the edge. ACLs that keep guests away from internal VLANs."],
        ["Secure remote access", "SSH only on network devices, and a VPN between sites if your tools support it."],
        ["Break it and fix it", "Introduce five faults. Diagnose each with show commands and a capture."],
        ["Write it up", "README with diagram, addressing table, config snippets and lessons learned."],
      ],
      checklist: [
        "Every VLAN has a documented subnet and gateway",
        "All sites reach each other and the edge",
        "Guests cannot reach internal VLANs (tested)",
        "No telnet, SSH only, and unused ports are shut down",
        "Five faults documented with cause and fix",
        "Topology diagram and configs are in a public repo",
      ],
      note: "",
    },
    {
      id: "p2", n: 2, title: "Secure AWS infrastructure", icon: "cloud", stages: [5, 6], difficulty: "Intermediate to advanced", time: "25–40 h",
      objective: "Build a small three-tier AWS environment that is secure by default, monitored, and cheap to run and tear down.",
      prerequisites: ["VPC, subnets, route tables and security groups", "IAM users, roles and policies", "An AWS account with MFA on the root user", "A billing budget alert"],
      skills: ["VPC design", "Least-privilege IAM", "Encryption with KMS", "Logging and alerting", "Cost control", "Infrastructure documentation"],
      tech: ["AWS VPC, EC2, S3, IAM, KMS", "CloudTrail and CloudWatch", "Systems Manager Session Manager", "Terraform or CloudFormation (optional)"],
      steps: [
        ["Secure the account", "MFA on root, a budget alert, and an admin role you use instead of the root user."],
        ["Design the VPC", "Public, private app and private data subnets across two availability zones."],
        ["Set routing and exposure", "Internet gateway for public subnets only. A NAT gateway for private egress, only while you test."],
        ["Add security groups and NACLs", "Reference security groups from each other. No SSH from 0.0.0.0/0."],
        ["Launch compute privately", "EC2 in private subnets, reached through Session Manager."],
        ["Lock down storage", "S3 with block public access, default encryption and a bucket policy."],
        ["Encrypt with KMS", "A customer-managed key with a tight key policy for S3 and EBS."],
        ["Turn on audit logging", "Multi-region CloudTrail to a separate log bucket. VPC Flow Logs on."],
        ["Alert on risky events", "CloudWatch alarms for root login, IAM policy changes and failed console logins."],
        ["Review and document", "Scan with Prowler, fix findings, write a short threat model and tear down anything that bills hourly."],
      ],
      checklist: [
        "Root user has MFA and is not used day to day",
        "No public S3 buckets and no 0.0.0.0/0 on admin ports",
        "CloudTrail is on in all regions and logs are protected",
        "Data at rest is encrypted with a key you control",
        "Alarms exist for root use and IAM changes",
        "Architecture diagram, threat model and cost notes are in the README",
      ],
      note: "Cost warning: NAT gateways, load balancers and some logging bill by the hour. Check the current AWS Free Tier terms, keep a budget alert on, and delete resources when you finish a session.",
    },
    {
      id: "p3", n: 3, title: "Cloud security monitoring with a SIEM", icon: "radar", stages: [6, 7], difficulty: "Advanced", time: "30–45 h",
      objective: "Stand up a SIEM, ingest host and cloud logs, write detections mapped to MITRE ATT&CK, and investigate simulated attacks.",
      prerequisites: ["Linux administration basics", "Log sources: syslog, Windows events, CloudTrail", "An AWS account with CloudTrail enabled", "A lab VM with 8 GB RAM or more"],
      skills: ["Log onboarding", "Detection engineering", "Alert triage", "Threat hunting", "Incident reporting", "MITRE ATT&CK mapping"],
      tech: ["Wazuh or Splunk", "Microsoft Sentinel (optional)", "AWS CloudTrail", "Sigma rules", "Atomic Red Team"],
      steps: [
        ["Choose the stack", "Pick Wazuh or Splunk and note why. Size the lab VM."],
        ["Deploy the SIEM", "Install it and confirm the dashboard works before adding anything."],
        ["Onboard host logs", "Agents on one Linux and one Windows VM. Verify events arrive."],
        ["Onboard cloud logs", "Send CloudTrail from your AWS account into the SIEM."],
        ["Write five detections", "SSH brute force, new admin user, root console login, disabled CloudTrail, unusual S3 access."],
        ["Map to ATT&CK", "Tag each detection with a technique ID and a severity."],
        ["Simulate attacks", "Trigger each detection safely with Atomic Red Team or manual steps in your own lab."],
        ["Build a dashboard", "One view an on-call analyst could read in a minute."],
        ["Tune the noise", "Record which alerts were noisy and how you fixed them."],
        ["Write an incident report", "One case from alert to timeline to lessons learned."],
      ],
      checklist: [
        "Host and cloud logs arrive and are searchable",
        "Five detections fire when the matching action is simulated",
        "Each detection has an ATT&CK technique and a severity",
        "A dashboard shows the last 24 hours at a glance",
        "One full incident report is written",
        "Everything ran only against systems you own",
      ],
      note: "Only run attack simulations against your own lab and your own accounts.",
    },
  ].map((p) => Object.assign(p, {
    steps: p.steps.map(([t, d]) => ({ t, d })),
  }));

  // Exam fees are public list prices checked in Sep 2026. Always confirm with the provider before booking.
  const CERTS = [
    {
      id: "ccna", order: 1, name: "Cisco Certified Network Associate", short: "CCNA", code: "200-301", issuer: "Cisco", stage: 2, optional: false,
      level: "Associate", valid: "3 years", url: "https://www.cisco.com/go/ccna",
      fee: { amount: 300, currency: "USD", note: "Cisco lists about USD 300. Taxes and local pricing vary." },
      blurb: "The standard networking associate certification. One exam covers switching, routing, IP services, security basics and automation.",
      prep: ["jeremy", "netacad", "ciscopress", "boson"],
    },
    {
      id: "clf", order: 2, name: "AWS Certified Cloud Practitioner", short: "AWS Cloud Practitioner", code: "CLF-C02", issuer: "Amazon Web Services", stage: 5, optional: false,
      level: "Foundational", valid: "3 years", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
      fee: { amount: 100, currency: "USD", note: "Public list price. Taxes and regional pricing vary." },
      blurb: "Cloud concepts, core AWS services, security and pricing. A gentle first exam.",
      prep: ["skillbuilder", "freecodecamp", "udemy-aws"],
    },
    {
      id: "saa", order: 3, name: "AWS Certified Solutions Architect – Associate", short: "AWS Solutions Architect Associate", code: "SAA-C03", issuer: "Amazon Web Services", stage: 5, optional: false,
      level: "Associate", valid: "3 years", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
      fee: { amount: 150, currency: "USD", note: "Listed on the AWS certification page. Taxes and regional pricing vary." },
      blurb: "Designing secure, resilient, cost-aware architectures on AWS. This is the one that proves you can build.",
      prep: ["skillbuilder", "udemy-aws", "tutorialsdojo", "aws-docs"],
    },
    {
      id: "secplus", order: 4, name: "CompTIA Security+", short: "CompTIA Security+", code: "SY0-701", issuer: "CompTIA", stage: 4, optional: true,
      level: "Foundational", valid: "3 years (with continuing education)", url: "https://www.comptia.org/certifications/security",
      fee: { amount: 439, currency: "USD", note: "CompTIA US list price after its June 2026 increase. Authorised resellers sometimes sell vouchers for less." },
      blurb: "Widely recognised security fundamentals certification. Optional, but common in job descriptions.",
      prep: ["messer", "comptia-official", "thm"],
    },
    {
      id: "sc200", order: 5, name: "Microsoft Security Operations Analyst", short: "Microsoft SC-200", code: "SC-200", issuer: "Microsoft", stage: 7, optional: false,
      level: "Associate", valid: "1 year (free online renewal)", url: "https://learn.microsoft.com/credentials/certifications/security-operations-analyst/",
      fee: { amount: 165, currency: "USD", note: "Public list price in the US. Other countries pay a local price plus tax." },
      blurb: "SOC-focused: Microsoft Sentinel, Defender, KQL, incident response and threat hunting.",
      prep: ["ms-learn", "sentinel-docs"],
    },
    {
      id: "awsscs", order: 6, name: "AWS Certified Security – Specialty", short: "AWS Security Specialty", code: "Current version — check provider", issuer: "Amazon Web Services", stage: 6, optional: true,
      level: "Specialty (later)", valid: "3 years", url: "https://aws.amazon.com/certification/",
      fee: { amount: 300, currency: "USD", note: "AWS lists Specialty exams at about USD 300. Confirm on the exam page." },
      blurb: "Advanced cloud security on AWS. Best taken after real hands-on experience.",
      prep: ["aws-secpillar", "aws-iam-bp", "tutorialsdojo"],
    },
  ];

  window.TP_DATA = { STAGES, PROJECTS, CERTS, DATA_VERIFIED: "Sep 2026" };
})();
