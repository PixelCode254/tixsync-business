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

  console.log("Seed complete. Admin login: admin@tixsyncsolutions.com / Admin@12345");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
