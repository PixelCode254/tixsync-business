import { PrismaClient, ProjectCategory } from "@prisma/client";
import bcrypt from "bcryptjs";
import { slugify } from "../src/lib/utils";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding TIXSYNC BUSINESS database...");

  // Admin user
  const hashedPassword = await bcrypt.hash("Admin@12345", 12);
  await prisma.user.upsert({
    where: { email: "admin@tixsyncsolutions.com" },
    update: {},
    create: {
      email: "admin@tixsyncsolutions.com",
      name: "TIXSYNC Admin",
      hashedPassword,
      role: "ADMIN",
    },
  });

  // Services
  const services = [
    {
      title: "Cybersecurity Solutions",
      icon: "Shield",
      description: "Comprehensive security audits, penetration testing, SOC setup, and compliance frameworks to protect your digital infrastructure.",
      features: ["Penetration Testing", "SOC Setup", "Compliance (ISO 27001, PCI-DSS)", "Incident Response", "Vulnerability Management"],
      order: 0, published: true,
    },
    {
      title: "Web & Application Development",
      icon: "Globe",
      description: "Enterprise-grade web platforms, mobile apps, and APIs built with modern frameworks and security-first architecture.",
      features: ["Full-Stack Development", "API Design & Integration", "Progressive Web Apps", "E-Commerce Platforms", "CMS Solutions"],
      order: 1, published: true,
    },
    {
      title: "Cloud Infrastructure",
      icon: "Cloud",
      description: "AWS, Azure, and GCP architecture, migration, and management with 99.9% uptime guarantees and cost optimization.",
      features: ["Cloud Migration", "Infrastructure as Code", "CI/CD Pipelines", "Container Orchestration", "Cost Optimization"],
      order: 2, published: true,
    },
    {
      title: "Digital Transformation",
      icon: "Building",
      description: "End-to-end strategy and implementation to modernize your business processes and technology stack.",
      features: ["Process Automation", "Legacy System Modernization", "Data Analytics", "AI/ML Integration", "Change Management"],
      order: 3, published: true,
    },
    {
      title: "Enterprise Consulting",
      icon: "Lock",
      description: "Strategic technology advisory for boards and C-suite, aligning IT initiatives with business objectives.",
      features: ["IT Strategy", "Vendor Selection", "Risk Assessment", "Technology Roadmapping", "Due Diligence"],
      order: 4, published: true,
    },
  ];

  for (const s of services) {
    let slug = slugify(s.title);
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;
    await prisma.service.create({ data: { ...s, slug } });
  }

  // Team members
  const teamMembers = [
    { name: "Cornelius Maina", role: "Founder & CEO", bio: "Technology leader with extensive experience in cybersecurity and enterprise solutions across East Africa.", order: 0, published: true },
    { name: "Engineering Team", role: "Technical Lead", bio: "Full-stack development and cloud architecture experts building scalable enterprise systems.", order: 1, published: true },
  ];

  for (const m of teamMembers) {
    await prisma.teamMember.create({ data: m });
  }

  // Projects
  const projects = [
    { title: "Enterprise Security Audit", description: "Comprehensive security assessment for a leading financial institution, identifying critical vulnerabilities and implementing remediation strategies.", category: "CYBERSECURITY" as ProjectCategory, techStack: ["Nessus", "Burp Suite", "Custom Scripts"], featured: true, order: 0, published: true },
    { title: "E-Commerce Platform", description: "Full-stack e-commerce solution with payment integration, inventory management, and real-time analytics dashboard.", category: "WEB_DEVELOPMENT" as ProjectCategory, techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"], featured: true, order: 1, published: true },
    { title: "Cloud Migration Project", description: "Seamless migration of legacy infrastructure to AWS with zero downtime and 40% cost reduction.", category: "CLOUD_INFRASTRUCTURE" as ProjectCategory, techStack: ["AWS", "Terraform", "Docker", "Kubernetes"], featured: true, order: 2, published: true },
    { title: "Digital Banking Platform", description: "Mobile-first digital banking solution with biometric authentication and real-time transaction processing.", category: "DIGITAL_TRANSFORMATION" as ProjectCategory, techStack: ["React Native", "Node.js", "PostgreSQL", "Redis"], order: 3, published: true },
    { title: "IT Strategy & Roadmap", description: "12-month technology transformation roadmap for a manufacturing conglomerate.", category: "CONSULTING" as ProjectCategory, techStack: ["Strategic Planning", "Vendor Analysis", "ROI Modeling"], order: 4, published: true },
  ];

  for (const p of projects) {
    let slug = slugify(p.title);
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;
    await prisma.project.create({ data: { ...p, slug } });
  }

  // Blog Posts
  const blogPosts = [
    {
      title: "Securing Modern Web Applications: A Full-Stack Security Integration Guide",
      slug: "securing-modern-web-applications-full-stack-security-guide",
      excerpt: "A comprehensive guide to embedding security at every layer of modern web applications — from React/Next.js frontends to Node.js backends and PostgreSQL databases. Learn how to mitigate API vulnerabilities before they become entry points for attackers.",
      content: `## Introduction

Modern web applications are complex ecosystems spanning client-side frameworks, server-side APIs, and database layers. Each layer introduces unique attack surfaces. At TIXSYNC SOLUTIONS, we believe security cannot be an afterthought — it must be woven into the development lifecycle from day one.

This guide walks through practical, production-grade security measures across the full stack.

## Frontend Security: React & Next.js

### Content Security Policy (CSP)

Next.js applications should enforce strict CSP headers to prevent XSS attacks:

\`\`\`js
// next.config.js
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://api.tixsyncsolutions.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

module.exports = { headers: async () => [{ source: "/(.*)", headers: securityHeaders }] };
\`\`\`

### Input Sanitization

Never trust client-side input. Use libraries like \`DOMPurify\` for HTML sanitization and \`zod\` for schema validation:

\`\`\`ts
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\\s'-]+$/),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});
\`\`\`

### Authentication Token Handling

Store JWT tokens in HTTP-only cookies, never \`localStorage\`. Next.js middleware can validate tokens on every request:

\`\`\`ts
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session-token")?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
\`\`\`

## Backend Security: Node.js & Express

### Rate Limiting & Request Validation

Implement rate limiting to prevent brute-force and DDoS attacks:

\`\`\`ts
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
\`\`\`

### SQL Injection Prevention

Always use parameterized queries or an ORM like Prisma. Never concatenate user input into SQL strings:

\`\`\`ts
// SAFE — Prisma parameterized query
const user = await prisma.user.findUnique({
  where: { email: userInput },
});

// DANGEROUS — Never do this
const user = await prisma.$queryRawUnsafe(
  \`SELECT * FROM users WHERE email = '\${userInput}'\`
);
\`\`\`

### API Response Sanitization

Never expose internal errors, stack traces, or database schemas in production responses:

\`\`\`ts
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal server error",
    // Never include: err.message, err.stack, or database details
  });
});
\`\`\`

## Database Security: PostgreSQL

### Role-Based Access Control

Create dedicated database roles with minimal privileges:

\`\`\`sql
-- Read-only role for the application
CREATE ROLE app_readonly LOGIN PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE tixsync_business TO app_readonly;
GRANT USAGE ON SCHEMA public TO app_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;

-- Read-write role for specific operations
CREATE ROLE app_readwrite LOGIN PASSWORD 'another_password';
GRANT app_readonly TO app_readwrite;
GRANT INSERT, UPDATE ON TABLE contacts, blog_posts TO app_readwrite;
\`\`\`

### Connection Encryption

Force SSL connections in your \`.env\`:

\`\`\`
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
\`\`\`

### Automated Backups

Schedule daily backups with \`pg_dump\` and store them in encrypted, off-site storage:

\`\`\`bash
pg_dump -h localhost -U postgres tixsync_business | gzip > backup_$(date +%Y%m%d).sql.gz
\`\`\`

## Actionable Takeaway

At TIXSYNC SOLUTIONS, we implement defense-in-depth across every layer of the applications we build. From CSP headers and input validation on the frontend, to parameterized queries and encrypted connections on the backend, our security-first architecture ensures your enterprise applications are resilient against the most common — and advanced — attack vectors. Contact us for a comprehensive security audit of your web infrastructure.`,
      author: "TIXSYNC Team",
      tags: ["cybersecurity", "web-development", "full-stack", "nodejs", "react", "postgresql", "api-security"],
      published: true,
    },
    {
      title: "Enterprise Cybersecurity: Proactive Network Security & Infrastructure Hardening Strategies",
      slug: "enterprise-cybersecurity-network-security-infrastructure-hardening",
      excerpt: "An expert analysis of proactive network defense and OS hardening techniques for modern enterprises. Discover how GRC frameworks and vulnerability assessments form the backbone of resilient infrastructure security.",
      content: `## Introduction

The enterprise threat landscape has evolved dramatically. Ransomware groups operate as sophisticated businesses, supply chain attacks compromise trusted software, and zero-day vulnerabilities are traded on dark markets. Reactive security — waiting for an alert and then responding — is no longer sufficient.

Organizations must adopt a proactive posture: hardening infrastructure before attackers find weaknesses, and governing risk through structured frameworks.

## The Modern Threat Landscape

### Key Attack Vectors in 2024-2025

- **Ransomware-as-a-Service (RaaS):** Criminal syndicates lease attack toolkits to affiliates, lowering the barrier to entry for cybercriminals.
- **Supply Chain Compromise:** Attacks targeting software dependencies and third-party vendors (e.g., SolarWinds, MOVEit) bypass perimeter defenses.
- **Identity-Based Attacks:** Credential stuffing, MFA fatigue, and session hijacking target the weakest link — human authentication.
- **Cloud Misconfigurations:** Exposed S3 buckets, overly permissive IAM roles, and unpatched cloud services remain top entry points.

## Network Security Hardening

### Firewall Architecture

Deploy a layered firewall strategy with explicit deny-by-default rules:

\`\`\`
# Example: iptables hardening rules
# Allow only essential services
iptables -A INPUT -p tcp --dport 22 -s 10.0.0.0/8 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# Block all other inbound traffic
iptables -A INPUT -j DROP

# Enable connection tracking
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
\`\`\`

### Network Segmentation

Isolate critical assets using VLANs and micro-segmentation:

- **DMZ:** Public-facing web servers with no direct access to internal databases
- **Application Tier:** Backend services that can only communicate with the DMZ and database tier
- **Database Tier:** Strictly isolated, accessible only from the application tier
- **Management Network:** Out-of-band management for admins (jump hosts, VPN)

### Intrusion Detection & Prevention

Deploy IDS/IPS solutions like Snort or Suricata with updated rule sets:

\`\`\`yaml
# Suricata rule example
alert http any any -> $HOME_NET any (
  msg:"SQL Injection Attempt";
  content:"SELECT"; nocase;
  content:"FROM"; nocase;
  distance:0;
  classtype:web-application-attack;
  sid:1000001; rev:1;
)
\`\`\`

## Operating System Hardening

### Linux Hardening Checklist

\`\`\`bash
# Disable unused services
systemctl disable cups bluetooth avahi-daemon

# Enforce SSH hardening
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
echo "Protocol 2" >> /etc/ssh/sshd_config

# Enable automatic security updates
apt install unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

# Set restrictive file permissions
chmod 600 /etc/shadow
chmod 644 /etc/passwd
\`\`\`

### Windows Server Hardening

- Enable Windows Defender ATP and configure attack surface reduction rules
- Disable SMBv1 and enforce SMB signing
- Configure AppLocker or WDAC for application whitelisting
- Enable audit logging for privilege escalation and policy changes

## Governance, Risk & Compliance (GRC)

### Framework Selection

| Framework | Best For | Key Focus |
|-----------|----------|-----------|
| **ISO 27001** | International organizations | Information security management system (ISMS) |
| **NIST CSF** | U.S. enterprises | Risk-based approach to cybersecurity |
| **PCI-DSS** | Payment card handlers | Cardholder data protection |
| **SOC 2** | SaaS and service providers | Trust service criteria |
| **GDPR** | EU data subjects | Data privacy and protection |

### Vulnerability Assessment Process

1. **Asset Discovery:** Map all network assets, services, and data flows
2. **Vulnerability Scanning:** Run authenticated scans with tools like Nessus, Qualys, or OpenVAS
3. **Risk Prioritization:** Use CVSS scores combined with business context to prioritize remediation
4. **Remediation:** Patch, reconfigure, or mitigate based on risk tolerance
5. **Verification:** Rescan to confirm remediation effectiveness
6. **Reporting:** Document findings for stakeholders and compliance auditors

## Actionable Takeaway

TIXSYNC SOLUTIONS approaches enterprise cybersecurity through a structured, framework-driven methodology. We conduct comprehensive vulnerability assessments, design network segmentation architectures, implement OS hardening baselines, and establish GRC programs tailored to your industry's compliance requirements. Our proactive approach ensures your infrastructure is hardened before attackers arrive — not after a breach demands it.`,
      author: "TIXSYNC Team",
      tags: ["cybersecurity", "infrastructure", "network-security", "compliance", "GRC", "vulnerability-assessment"],
      published: true,
    },
    {
      title: "Cloud Best Practices: Architecting Scalable, Secure Enterprise Environments in 2025",
      slug: "cloud-best-practices-architecting-scalable-secure-enterprise-environments",
      excerpt: "Explore the architectural shift in enterprise cloud computing — from infrastructure design to security protocols. Learn how modern full-stack development and cloud-native patterns create resilient, scalable environments.",
      content: `## Introduction

Enterprise cloud adoption has moved beyond "lift and shift" migrations. Organizations are now building cloud-native architectures that leverage microservices, container orchestration, serverless computing, and infrastructure-as-code. But with greater flexibility comes greater complexity — and greater risk.

At TIXSYNC SOLUTIONS, we architect cloud environments that balance performance, cost, and security from day one.

## Cloud Architecture Principles

### The Well-Architected Framework

AWS, Azure, and GCP each publish Well-Architected Frameworks built on five pillars:

1. **Operational Excellence:** Automate everything — deployments, monitoring, scaling, and recovery
2. **Security:** Implement zero-trust principles across identity, network, and data layers
3. **Reliability:** Design for failure with multi-AZ deployments and automated failover
4. **Performance Efficiency:** Right-size resources and leverage auto-scaling
5. **Cost Optimization:** Implement tagging, budgets, and reserved capacity planning

### Infrastructure as Code (IaC)

Every resource should be defined in code. Terraform provides cloud-agnostic infrastructure management:

\`\`\`hcl
# main.tf — Secure S3 Bucket Configuration
resource "aws_s3_bucket" "data" {
  bucket = "tixsync-enterprise-data-\${var.environment}"
}

resource "aws_s3_bucket_versioning" "data" {
  bucket = aws_s3_bucket.data.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "data" {
  bucket = aws_s3_bucket.data.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "aws:kms"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
\`\`\`

## Container Security

### Kubernetes Hardening

Deploy Kubernetes clusters with security contexts and network policies:

\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-app
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
    - name: app
      image: tixsync/app:latest
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
      resources:
        limits:
          memory: "256Mi"
          cpu: "500m"
\`\`\`

### Container Image Scanning

Integrate image scanning into CI/CD pipelines:

\`\`\`yaml
# GitHub Actions workflow
- name: Scan container image
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: "tixsync/app:\${{ github.sha }}"
    format: "sarif"
    severity: "CRITICAL,HIGH"
    exit-code: "1"
\`\`\`

## Cloud Security Protocols

### Identity & Access Management

- **Principle of Least Privilege:** Grant only the permissions required for each role
- **Multi-Factor Authentication:** Enforce MFA for all human and programmatic access
- **Service Accounts:** Use workload identity federation instead of long-lived credentials
- **Regular Access Reviews:** Audit and revoke unused permissions quarterly

### Network Security

\`\`\`hcl
# Terraform — Security Group with minimal access
resource "aws_security_group" "app" {
  name_prefix = "tixsync-app-"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [var.alb_security_group_id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Environment = var.environment }
}
\`\`\`

### Logging & Monitoring

Deploy centralized logging with CloudWatch, ELK, or Datadog:

- Enable VPC Flow Logs for network traffic analysis
- Aggregate application logs with structured JSON formatting
- Set up alerts for anomalous API calls via CloudTrail
- Implement SIEM correlation rules for threat detection

## The Full-Stack + Cloud Intersection

Modern enterprise applications blur the line between development and infrastructure. Serverless functions, edge computing, and managed databases require developers to understand cloud-native patterns:

- **Next.js on Vercel/AWS:** Leverage ISR, edge functions, and managed databases
- **Serverless APIs:** AWS Lambda or Cloudflare Workers with DynamoDB/PlanetScale
- **CI/CD Pipelines:** Automated testing, scanning, and deployment with GitHub Actions or GitLab CI
- **Observability:** Distributed tracing with OpenTelemetry across microservices

## Actionable Takeaway

TIXSYNC SOLUTIONS architects cloud environments that are secure, scalable, and cost-efficient from the first line of code. We implement infrastructure-as-code with Terraform, harden Kubernetes clusters with security contexts and network policies, enforce IAM least-privilege principles, and deploy centralized monitoring for real-time threat detection. Whether you're migrating to the cloud or building cloud-native applications, our team ensures your infrastructure is enterprise-ready.`,
      author: "TIXSYNC Team",
      tags: ["cloud", "aws", "kubernetes", "terraform", "devops", "cloud-security", "enterprise"],
      published: true,
    },
  ];

  for (const b of blogPosts) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: b.slug } });
    if (!existing) {
      await prisma.blogPost.create({ data: b });
    }
  }

  // ─── Testimonials ──────────────────────────────────
  const testimonialData = [
    { name: "James Kariuki", role: "CTO, FinSecure Bank", content: "TIXSYNC transformed our security posture. Their penetration testing identified vulnerabilities that our internal team had missed for years. Enterprise-grade work.", rating: 5, order: 1 },
    { name: "Sarah Wanjiku", role: "VP Engineering, EastTel", content: "The cloud migration was seamless. Zero downtime, 40% cost reduction. TIXSYNC's team understood our complex requirements from day one.", rating: 5, order: 2 },
    { name: "David Mwangi", role: "CEO, SafeHomes Africa", content: "Professional, thorough, and results-driven. Their cybersecurity audit gave us the confidence to scale our operations nationally.", rating: 5, order: 3 },
    { name: "Grace Nyambura", role: "Director, KINAPSA", content: "TIXSYNC delivered our digital transformation project on time and under budget. Their enterprise approach is what sets them apart.", rating: 5, order: 4 },
  ];

  await prisma.testimonial.createMany({
    data: testimonialData,
    skipDuplicates: true,
  });

  console.log("Seed complete. Admin login: admin@tixsyncsolutions.com / Admin@12345");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
