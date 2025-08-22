import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AccountTypeSwitcher } from "../../components/ui/account-type-switcher";
import confetti from "canvas-confetti";
import { ProfileDropdown } from "../../components/ui/profile-dropdown";
import { useAuth } from "../../hooks/useAuth";
import { PosManagement } from "./Pos";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { BellIcon, SearchIcon, ArrowLeftIcon, CrownIcon, ShieldIcon, UsersIcon, SettingsIcon, BarChart3Icon, DatabaseIcon, ServerIcon, CreditCardIcon, BuildingIcon, FileTextIcon, CheckCircleIcon, XCircleIcon, ClockIcon, AlertTriangleIcon, TrendingUpIcon, TrendingDownIcon, DollarSignIcon, MapPinIcon, GlobeIcon, KeyIcon, CodeIcon, ShoppingCartIcon, HardDriveIcon, ActivityIcon, CogIcon, UserIcon, WalletIcon, HandshakeIcon, SearchCheckIcon, PieChartIcon, MessageSquareIcon, MailIcon, TicketIcon, PaletteIcon, GiftIcon, StarIcon, FolderIcon, LockIcon, MonitorIcon, WifiOffIcon, PlusIcon, EditIcon, TrashIcon, EyeIcon, DownloadIcon, UploadIcon, RefreshCwIcon, FilterIcon, MoreHorizontalIcon, ChevronDownIcon, HomeIcon, HeadphonesIcon, PhoneIcon, CalendarIcon, ClipboardIcon, LinkIcon, ZapIcon, ShieldCheckIcon, AlertCircleIcon, InfoIcon, CheckIcon, XIcon, PlayIcon, PauseIcon, HopIcon as StopIcon, RotateCcwIcon, SaveIcon, SendIcon, CopyIcon, ShareIcon, PrinterIcon, ExternalLinkIcon, ArrowRightIcon, ArrowUpIcon, ArrowDownIcon, TrendingUpIcon as TrendingUp, TrendingDownIcon as TrendingDown } from "lucide-react";

export const SuperAdminDashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, getUserDisplayName, getUserInitials } = useAuth();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: "", message: "" });
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedUserType, setSelectedUserType] = useState("all");
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // User Management State
  const [editingUser, setEditingUser] = useState<any>(null);
  const [userContactInfo, setUserContactInfo] = useState({
    phone: "",
    email: "",
    alternatePhone: "",
    alternateEmail: ""
  });

  // Confetti animation function
  const triggerConfetti = () => {
    if (hasTriggeredConfetti) return;
    
    setHasTriggeredConfetti(true);
    
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 9999
    });
  };

  const showSuccess = (title: string, message: string) => {
    setSuccessMessage({ title, message });
    setShowSuccessModal(true);
    setHasTriggeredConfetti(false);
    
    setTimeout(() => {
      triggerConfetti();
    }, 300);

    setTimeout(() => {
      setShowSuccessModal(false);
      setHasTriggeredConfetti(false);
    }, 4000);
  };



  // Navigation items for Super Admin
  const superAdminNavItems = [
    { id: "dashboard", name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, description: "Platform Overview" },
    { id: "admin-users", name: "Admin Users", icon: <ShieldIcon className="w-5 h-5" />, description: "Admin Management" },
    { id: "rbac", name: "RBAC & Permissions", icon: <KeyIcon className="w-5 h-5" />, description: "Role Management" },
    { id: "users", name: "User Management", icon: <UsersIcon className="w-5 h-5" />, description: "All Users" },
    { id: "kyc", name: "KYC Management", icon: <FileTextIcon className="w-5 h-5" />, description: "Identity Verification" },
    { id: "kyb", name: "KYB Management", icon: <BuildingIcon className="w-5 h-5" />, description: "Business Verification" },
    { id: "regional", name: "Regional Management", icon: <GlobeIcon className="w-5 h-5" />, description: "Multi-Region Control" },
    { id: "bulk-data", name: "Bulk Data Management", icon: <DatabaseIcon className="w-5 h-5" />, description: "Data Operations" },
    { id: "approval-workflow", name: "Approval Workflow", icon: <CheckCircleIcon className="w-5 h-5" />, description: "Workflow Management" },
    { id: "transactions", name: "Transaction Management", icon: <CreditCardIcon className="w-5 h-5" />, description: "Transaction Control" },
    { id: "cards", name: "Card Management", icon: <CreditCardIcon className="w-5 h-5" />, description: "Card Operations" },
    { id: "pos", name: "POS Management", icon: <BuildingIcon className="w-5 h-5" />, description: "Terminal Control" },
    { id: "third-party", name: "Third Party Integration", icon: <LinkIcon className="w-5 h-5" />, description: "External Services" },
    { id: "api", name: "API Management", icon: <CodeIcon className="w-5 h-5" />, description: "API Control" },
    { id: "developer", name: "Developer Tools", icon: <CodeIcon className="w-5 h-5" />, description: "Dev Environment" },
    { id: "marketplace", name: "Marketplace", icon: <ShoppingCartIcon className="w-5 h-5" />, description: "Product Management" },
    { id: "database", name: "Database Management", icon: <HardDriveIcon className="w-5 h-5" />, description: "DB Operations" },
    { id: "system-health", name: "System Health", icon: <ActivityIcon className="w-5 h-5" />, description: "Analytics" },
    { id: "subscription", name: "Subscription & Fees", icon: <DollarSignIcon className="w-5 h-5" />, description: "Billing Management" },
    { id: "system-logs", name: "System Logs", icon: <FileTextIcon className="w-5 h-5" />, description: "Log Management" },
    { id: "profile", name: "Profile Settings", icon: <UserIcon className="w-5 h-5" />, description: "Admin Profile" },
    { id: "wallet", name: "Wallet Management", icon: <WalletIcon className="w-5 h-5" />, description: "Wallet Operations" },
    { id: "escrow", name: "Escrow Management", icon: <HandshakeIcon className="w-5 h-5" />, description: "Escrow Control" },
    { id: "background-check", name: "Background Check", icon: <SearchCheckIcon className="w-5 h-5" />, description: "User Screening" },
    { id: "reports", name: "Reports & Analytics", icon: <PieChartIcon className="w-5 h-5" />, description: "Platform Reports" },
    { id: "disputes", name: "Dispute Management", icon: <AlertTriangleIcon className="w-5 h-5" />, description: "Dispute Resolution" },
    { id: "chat", name: "Chat Management", icon: <MessageSquareIcon className="w-5 h-5" />, description: "Platform Chat" },
    { id: "email", name: "Email & Templates", icon: <MailIcon className="w-5 h-5" />, description: "Email Management" },
    { id: "notifications", name: "Notification Management", icon: <BellIcon className="w-5 h-5" />, description: "Notification Control" },
    { id: "tickets", name: "Ticketing System", icon: <TicketIcon className="w-5 h-5" />, description: "Support Tickets" },
    { id: "white-label", name: "White Labelling", icon: <PaletteIcon className="w-5 h-5" />, description: "Platform Customization" },
    { id: "referrals", name: "Referrals Management", icon: <GiftIcon className="w-5 h-5" />, description: "Referral System" },
    { id: "rewards", name: "Reward Management", icon: <StarIcon className="w-5 h-5" />, description: "Reward System" },
    { id: "ratings", name: "Ratings Management", icon: <StarIcon className="w-5 h-5" />, description: "Rating System" },
    { id: "documents", name: "Document Management", icon: <FolderIcon className="w-5 h-5" />, description: "Document Control" },
    { id: "security", name: "Security Center", icon: <LockIcon className="w-5 h-5" />, description: "Security Management" },
    { id: "content", name: "Website Content", icon: <MonitorIcon className="w-5 h-5" />, description: "Content Management" },
    { id: "downtime", name: "Downtime Tracker", icon: <WifiOffIcon className="w-5 h-5" />, description: "Uptime Monitoring" }
  ];

  // Sample data for all pages
  const platformStats = {
    totalUsers: 2500000,
    totalTransactions: 45600000,
    totalRevenue: 125000000000,
    uptime: 99.97,
    activeRegions: 10,
    totalAdmins: 247
  };

  const adminUsers = [
    { id: "1", firstName: "John", middleName: "Michael", lastName: "Admin", email: "john@surebanker.com", phone: "+234 801 234 5678", role: "Super Admin", regions: ["Nigeria", "Ghana"], status: "Active", lastLogin: "2 hours ago" },
    { id: "2", firstName: "Sarah", middleName: "Jane", lastName: "Regional", email: "sarah@surebanker.com", phone: "+234 802 345 6789", role: "Regional Admin", regions: ["Kenya", "Tanzania"], status: "Active", lastLogin: "1 day ago" },
    { id: "3", firstName: "Mike", middleName: "David", lastName: "Support", email: "mike@surebanker.com", phone: "+234 803 456 7890", role: "Support Admin", regions: ["Nigeria"], status: "Inactive", lastLogin: "1 week ago" }
  ];

  const roles = [
    { id: "1", name: "Super Admin", permissions: 127, users: 12, description: "Full platform access" },
    { id: "2", name: "Regional Admin", permissions: 89, users: 85, description: "Regional management access" },
    { id: "3", name: "Support Admin", permissions: 45, users: 150, description: "Customer support access" }
  ];

  const users = [
    { id: "1", firstName: "Carchy", middleName: "Emeka", lastName: "Atinse", email: "carchy@email.com", phone: "+234 801 111 2222", type: "Individual", kycStatus: "Tier 2", region: "Nigeria", status: "Active", balance: 120000, lastLogin: "2 hours ago" },
    { id: "2", firstName: "Tech", middleName: "", lastName: "Solutions", email: "admin@techsolutions.com", phone: "+234 802 333 4444", type: "Business", kybStatus: "Tier 3", region: "Ghana", status: "Active", balance: 2500000, lastLogin: "1 day ago" },
    { id: "3", firstName: "Alex", middleName: "James", lastName: "Developer", email: "alex@dev.com", phone: "+234 803 555 6666", type: "Developer", kycStatus: "Tier 1", region: "Kenya", status: "Active", balance: 50000, lastLogin: "3 hours ago" },
    { id: "4", firstName: "John", middleName: "Michael", lastName: "Admin", email: "john@surebanker.com", phone: "+234 804 777 8888", type: "Admin", kycStatus: "Verified", region: "Nigeria", status: "Active", balance: 0, lastLogin: "1 hour ago" },
    { id: "5", firstName: "Sarah", middleName: "Jane", lastName: "Support", email: "sarah@support.com", phone: "+234 805 999 0000", type: "Support", kycStatus: "Verified", region: "Ghana", status: "Active", balance: 0, lastLogin: "30 minutes ago" },
    { id: "6", firstName: "Mike", middleName: "Robert", lastName: "SuperAdmin", email: "mike@superadmin.com", phone: "+234 806 111 2222", type: "SuperAdmin", kycStatus: "Verified", region: "All", status: "Active", balance: 0, lastLogin: "5 minutes ago" }
  ];

  const regions = [
    { id: "1", name: "Nigeria", code: "NG", users: 1200000, admins: 45, status: "Active", database: "ng-prod-db", lastUpdate: "2 hours ago" },
    { id: "2", name: "Ghana", code: "GH", users: 450000, admins: 12, status: "Active", database: "gh-prod-db", lastUpdate: "1 day ago" },
    { id: "3", name: "Kenya", code: "KE", users: 380000, admins: 8, status: "Active", database: "ke-prod-db", lastUpdate: "3 hours ago" },
    { id: "4", name: "South Africa", code: "ZA", users: 320000, admins: 15, status: "Active", database: "za-prod-db", lastUpdate: "5 hours ago" },
    { id: "5", name: "Tanzania", code: "TZ", users: 150000, admins: 6, status: "Pending", database: "tz-staging-db", lastUpdate: "1 week ago" }
  ];

  const transactions = [
    { id: "TXN001", amount: 50000, type: "Transfer", status: "Completed", user: "Carchy Atinse", region: "Nigeria", date: "2024-01-15", time: "14:30" },
    { id: "TXN002", amount: 125000, type: "Payment", status: "Pending", user: "Tech Solutions", region: "Ghana", date: "2024-01-15", time: "12:15" },
    { id: "TXN003", amount: 25000, type: "Withdrawal", status: "Failed", user: "Alex Developer", region: "Kenya", date: "2024-01-15", time: "09:45" }
  ];

  const cards = [
    { id: "CARD001", cardNumber: "4532 **** **** 9012", holderName: "Carchy Atinse", type: "Visa", status: "Active", spendingLimit: 100000, monthlySpent: 25000, region: "Nigeria" },
    { id: "CARD002", cardNumber: "5234 **** **** 3456", holderName: "John Doe", type: "Mastercard", status: "Blocked", spendingLimit: 50000, monthlySpent: 0, region: "Ghana" },
    { id: "CARD003", cardNumber: "5061 **** **** 0123", holderName: "Jane Smith", type: "Verve", status: "Expired", spendingLimit: 25000, monthlySpent: 0, region: "Kenya" }
  ];



  const approvalRequests = [
    { id: "APR001", type: "Large Transfer", description: "Transfer of ₦5,000,000 to vendor", amount: 5000000, requestedBy: "Business Admin", currentApprover: "Regional Manager", priority: "High", status: "Pending", region: "Nigeria", stage: "1 of 3" },
    { id: "APR002", type: "User Role Change", description: "Promote user to Business Admin", amount: 0, requestedBy: "HR Manager", currentApprover: "Super Admin", priority: "Medium", status: "Approved", region: "Ghana", stage: "3 of 3" },
    { id: "APR003", type: "KYC Override", description: "Manual KYC approval for special case", amount: 0, requestedBy: "Support Agent", currentApprover: "Compliance Officer", priority: "Low", status: "Rejected", region: "Kenya", stage: "2 of 2" }
  ];

  const kycCases = [
    { id: "KYC001", userName: "John Doe", currentTier: "Tier 1", requestedTier: "Tier 2", documents: 3, status: "Under Review", submittedDate: "2024-01-10", region: "Nigeria" },
    { id: "KYC002", userName: "Jane Smith", currentTier: "Tier 2", requestedTier: "Tier 3", documents: 5, status: "Approved", submittedDate: "2024-01-08", region: "Ghana" },
    { id: "KYC003", userName: "Mike Johnson", currentTier: "Tier 0", requestedTier: "Tier 1", documents: 2, status: "Rejected", submittedDate: "2024-01-12", region: "Kenya" }
  ];

  const kybCases = [
    { id: "KYB001", businessName: "Tech Solutions Ltd", currentTier: "Tier 1", requestedTier: "Tier 2", documents: 8, status: "Under Review", submittedDate: "2024-01-09", region: "Nigeria" },
    { id: "KYB002", businessName: "Green Energy Corp", currentTier: "Tier 2", requestedTier: "Tier 3", documents: 12, status: "Approved", submittedDate: "2024-01-07", region: "Ghana" },
    { id: "KYB003", businessName: "Retail Masters Inc", currentTier: "Tier 0", requestedTier: "Tier 1", documents: 5, status: "Pending Documents", submittedDate: "2024-01-11", region: "Kenya" }
  ];

  const bulkJobs = [
    { id: "BULK001", type: "User Import", fileName: "users_batch_001.csv", records: 10000, processed: 8500, status: "Processing", startTime: "14:30", region: "Nigeria" },
    { id: "BULK002", type: "Transaction Export", fileName: "transactions_2024_q1.csv", records: 500000, processed: 500000, status: "Completed", startTime: "09:15", region: "Ghana" },
    { id: "BULK003", type: "Data Archive", fileName: "archive_2023.zip", records: 2000000, processed: 0, status: "Queued", startTime: "Pending", region: "Kenya" }
  ];

  const integrations = [
    { id: "INT001", name: "Paystack", type: "Payment Gateway", status: "Active", uptime: "99.9%", lastSync: "2 minutes ago", region: "Nigeria" },
    { id: "INT002", name: "Flutterwave", type: "Payment Gateway", status: "Active", uptime: "99.7%", lastSync: "5 minutes ago", region: "Ghana" },
    { id: "INT003", name: "Smile Identity", type: "KYC Provider", status: "Maintenance", uptime: "95.2%", lastSync: "2 hours ago", region: "Kenya" }
  ];

  const apiEndpoints = [
    { id: "API001", endpoint: "/api/v1/users", method: "GET", calls: 125000, successRate: "99.8%", avgResponse: "145ms", status: "Healthy" },
    { id: "API002", endpoint: "/api/v1/transactions", method: "POST", calls: 89000, successRate: "99.2%", avgResponse: "230ms", status: "Healthy" },
    { id: "API003", endpoint: "/api/v1/cards", method: "PUT", calls: 12000, successRate: "97.5%", avgResponse: "180ms", status: "Warning" }
  ];

  const developers = [
    { id: "DEV001", name: "Alex Developer", email: "alex@dev.com", apiKeys: 3, sandboxEnv: "Active", lastActivity: "2 hours ago", region: "Nigeria" },
    { id: "DEV002", name: "Sarah Coder", email: "sarah@code.com", apiKeys: 5, sandboxEnv: "Active", lastActivity: "1 day ago", region: "Ghana" },
    { id: "DEV003", name: "Mike Builder", email: "mike@build.com", apiKeys: 2, sandboxEnv: "Suspended", lastActivity: "1 week ago", region: "Kenya" }
  ];

  const marketplaceProducts = [
    { id: "PROD001", name: "Premium Banking Package", vendor: "FinTech Solutions", price: 50000, sales: 1245, revenue: 62250000, status: "Active" },
    { id: "PROD002", name: "Business Loan Service", vendor: "Capital Partners", price: 100000, sales: 567, revenue: 56700000, status: "Active" },
    { id: "PROD003", name: "Insurance Package", vendor: "SecureLife", price: 25000, sales: 890, revenue: 22250000, status: "Pending" }
  ];

  const databases = [
    { id: "DB001", name: "Primary Database", region: "Nigeria", size: "2.8TB", connections: 145, queryTime: "89ms", status: "Healthy", lastBackup: "2 hours ago" },
    { id: "DB002", name: "Ghana Database", region: "Ghana", size: "1.2TB", connections: 67, queryTime: "92ms", status: "Healthy", lastBackup: "4 hours ago" },
    { id: "DB003", name: "Kenya Database", region: "Kenya", size: "890GB", connections: 34, queryTime: "156ms", status: "Warning", lastBackup: "1 day ago" }
  ];

  const subscriptions = [
    { id: "SUB001", planName: "Basic Plan", subscribers: 1200000, monthlyRevenue: 60000000, churnRate: "2.1%", arpu: 50 },
    { id: "SUB002", planName: "Premium Plan", subscribers: 450000, monthlyRevenue: 45000000, churnRate: "1.8%", arpu: 100 },
    { id: "SUB003", planName: "Business Plan", subscribers: 50000, monthlyRevenue: 25000000, churnRate: "1.2%", arpu: 500 }
  ];

  const disputes = [
    { id: "DIS001", transactionId: "TXN12345", amount: 50000, type: "Unauthorized Transaction", status: "Open", priority: "High", assignedTo: "Support Agent 1", createdDate: "2024-01-14", region: "Nigeria" },
    { id: "DIS002", transactionId: "TXN12346", amount: 25000, type: "Failed Payment", status: "Resolved", priority: "Medium", assignedTo: "Support Agent 2", createdDate: "2024-01-12", region: "Ghana" },
    { id: "DIS003", transactionId: "TXN12347", amount: 75000, type: "Duplicate Charge", status: "In Progress", priority: "Low", assignedTo: "Support Agent 3", createdDate: "2024-01-13", region: "Kenya" }
  ];

  const tickets = [
    { id: "TIC001", subject: "Login Issues", category: "Technical", priority: "High", status: "Open", assignedTo: "Tech Support", createdBy: "User123", createdDate: "2024-01-15", region: "Nigeria" },
    { id: "TIC002", subject: "Payment Failed", category: "Financial", priority: "Medium", status: "Resolved", assignedTo: "Finance Team", createdBy: "Business456", createdDate: "2024-01-14", region: "Ghana" },
    { id: "TIC003", subject: "Account Verification", category: "KYC", priority: "Low", status: "In Progress", assignedTo: "KYC Team", createdBy: "Individual789", createdDate: "2024-01-13", region: "Kenya" }
  ];

  const referralCampaigns = [
    { id: "REF001", name: "New Year Campaign", totalReferrals: 12456, conversions: 8934, conversionRate: "71.7%", rewardsPaid: 8934000, status: "Active", endDate: "2024-03-31" },
    { id: "REF002", name: "Business Boost", totalReferrals: 5678, conversions: 4123, conversionRate: "72.6%", rewardsPaid: 4123000, status: "Active", endDate: "2024-06-30" },
    { id: "REF003", name: "Student Special", totalReferrals: 3456, conversions: 2345, conversionRate: "67.9%", rewardsPaid: 1172500, status: "Ended", endDate: "2024-01-31" }
  ];

  const rewardPrograms = [
    { id: "RWD001", name: "Cashback Rewards", type: "Cashback", participants: 450000, totalPaid: 125000000, participationRate: "18%", redemptionRate: "67.8%" },
    { id: "RWD002", name: "Loyalty Points", type: "Points", participants: 320000, totalPaid: 45000000, participationRate: "12.8%", redemptionRate: "72.1%" },
    { id: "RWD003", name: "Referral Bonus", type: "Referral", participants: 85000, totalPaid: 12000000, participationRate: "3.4%", redemptionRate: "89.5%" }
  ];

  const systemLogs = [
    { id: "LOG001", level: "INFO", message: "User login successful", timestamp: "2024-01-15 14:30:23", source: "Auth Service", region: "Nigeria" },
    { id: "LOG002", level: "ERROR", message: "Database connection timeout", timestamp: "2024-01-15 14:25:15", source: "DB Service", region: "Ghana" },
    { id: "LOG003", level: "WARN", message: "High memory usage detected", timestamp: "2024-01-15 14:20:45", source: "System Monitor", region: "Kenya" }
  ];

  const documents = [
    { id: "DOC001", name: "KYC_Document_001.pdf", type: "KYC", size: "2.5MB", uploadDate: "2024-01-10", status: "Verified", uploadedBy: "User123", region: "Nigeria" },
    { id: "DOC002", name: "Business_License.pdf", type: "KYB", size: "1.8MB", uploadDate: "2024-01-09", status: "Under Review", uploadedBy: "Business456", region: "Ghana" },
    { id: "DOC003", name: "Financial_Statement.xlsx", type: "Financial", size: "5.2MB", uploadDate: "2024-01-08", status: "Approved", uploadedBy: "Company789", region: "Kenya" }
  ];

  const securityEvents = [
    { id: "SEC001", type: "Failed Login", description: "Multiple failed login attempts", severity: "High", timestamp: "2024-01-15 14:30", user: "Unknown", ipAddress: "192.168.1.100", region: "Nigeria" },
    { id: "SEC002", type: "Suspicious Activity", description: "Unusual transaction pattern detected", severity: "Medium", timestamp: "2024-01-15 12:15", user: "User123", ipAddress: "10.0.0.50", region: "Ghana" },
    { id: "SEC003", type: "Password Change", description: "Admin password changed", severity: "Low", timestamp: "2024-01-15 09:45", user: "Admin456", ipAddress: "172.16.0.25", region: "Kenya" }
  ];

  const contentPages = [
    { id: "CNT001", title: "Terms of Service", type: "Legal", status: "Published", lastModified: "2024-01-10", author: "Legal Team", views: 125000 },
    { id: "CNT002", title: "Privacy Policy", type: "Legal", status: "Published", lastModified: "2024-01-08", author: "Legal Team", views: 89000 },
    { id: "CNT003", title: "How to Transfer Money", type: "Support", status: "Draft", lastModified: "2024-01-12", author: "Support Team", views: 0 }
  ];

  const downtimeIncidents = [
    { id: "INC001", service: "Payment Gateway", startTime: "2024-01-14 15:30", endTime: "2024-01-14 16:45", duration: "1h 15m", severity: "High", status: "Resolved", affectedRegions: ["Nigeria", "Ghana"] },
    { id: "INC002", service: "Mobile App", startTime: "2024-01-13 09:15", endTime: "2024-01-13 09:45", duration: "30m", severity: "Medium", status: "Resolved", affectedRegions: ["Kenya"] },
    { id: "INC003", service: "API Gateway", startTime: "2024-01-15 14:00", endTime: "Ongoing", duration: "2h 30m", severity: "Critical", status: "Investigating", affectedRegions: ["All"] }
  ];

  const walletOperations = [
    { id: "WAL001", walletId: "WALLET123", operation: "Deposit", amount: 100000, status: "Completed", timestamp: "2024-01-15 14:30", region: "Nigeria", balance: 500000 },
    { id: "WAL002", walletId: "WALLET456", operation: "Withdrawal", amount: 50000, status: "Pending", timestamp: "2024-01-15 12:15", region: "Ghana", balance: 250000 },
    { id: "WAL003", walletId: "WALLET789", operation: "Transfer", amount: 25000, status: "Failed", timestamp: "2024-01-15 09:45", region: "Kenya", balance: 75000 }
  ];

  const escrowTransactions = [
    { id: "ESC001", transactionId: "TXN12345", amount: 500000, buyer: "Company A", seller: "Company B", status: "Held", createdDate: "2024-01-10", releaseDate: "2024-01-20", region: "Nigeria" },
    { id: "ESC002", transactionId: "TXN12346", amount: 250000, buyer: "User123", seller: "Merchant456", status: "Released", createdDate: "2024-01-08", releaseDate: "2024-01-12", region: "Ghana" },
    { id: "ESC003", transactionId: "TXN12347", amount: 750000, buyer: "Business789", seller: "Vendor012", status: "Disputed", createdDate: "2024-01-09", releaseDate: "Pending", region: "Kenya" }
  ];

  const backgroundChecks = [
    { id: "BGC001", userId: "USER123", checkType: "Identity Verification", status: "Completed", score: "95%", completedDate: "2024-01-10", region: "Nigeria" },
    { id: "BGC002", userId: "USER456", checkType: "Credit Check", status: "In Progress", score: "Pending", completedDate: "Pending", region: "Ghana" },
    { id: "BGC003", userId: "USER789", checkType: "Criminal Background", status: "Failed", score: "45%", completedDate: "2024-01-12", region: "Kenya" }
  ];

  const chatSessions = [
    { id: "CHAT001", userId: "USER123", agentId: "AGENT001", status: "Active", startTime: "14:30", duration: "15m", messages: 23, region: "Nigeria" },
    { id: "CHAT002", userId: "USER456", agentId: "AGENT002", status: "Ended", startTime: "12:15", duration: "45m", messages: 67, region: "Ghana" },
    { id: "CHAT003", userId: "USER789", agentId: "AGENT003", status: "Queued", startTime: "Pending", duration: "0m", messages: 0, region: "Kenya" }
  ];

  const emailTemplates = [
    { id: "EMAIL001", name: "Welcome Email", type: "Onboarding", usage: 12456, lastUsed: "2024-01-15", status: "Active", openRate: "78.5%" },
    { id: "EMAIL002", name: "Transaction Alert", type: "Notification", usage: 89000, lastUsed: "2024-01-15", status: "Active", openRate: "92.1%" },
    { id: "EMAIL003", name: "KYC Reminder", type: "Reminder", usage: 5678, lastUsed: "2024-01-14", status: "Draft", openRate: "0%" }
  ];

  const notifications = [
    { id: "NOT001", title: "System Maintenance", type: "System", recipients: 2500000, sent: 2500000, delivered: 2487500, opened: 1865625, status: "Sent" },
    { id: "NOT002", title: "New Feature Launch", type: "Product", recipients: 1200000, sent: 1200000, delivered: 1188000, opened: 950400, status: "Sent" },
    { id: "NOT003", title: "Security Alert", type: "Security", recipients: 50000, sent: 0, delivered: 0, opened: 0, status: "Draft" }
  ];

  const whiteLabels = [
    { id: "WL001", clientName: "Bank of Nigeria", domain: "banking.ng", primaryColor: "#1E40AF", secondaryColor: "#3B82F6", status: "Active", users: 500000 },
    { id: "WL002", clientName: "Ghana Financial", domain: "ghanafin.com", primaryColor: "#059669", secondaryColor: "#10B981", status: "Active", users: 250000 },
    { id: "WL003", clientName: "Kenya Credit", domain: "kenyacredit.ke", primaryColor: "#DC2626", secondaryColor: "#EF4444", status: "Setup", users: 0 }
  ];

  const ratings = [
    { id: "RAT001", userId: "USER123", rating: 5, comment: "Excellent service!", category: "App Experience", date: "2024-01-15", status: "Published", region: "Nigeria" },
    { id: "RAT002", userId: "USER456", rating: 4, comment: "Good but could be better", category: "Customer Support", date: "2024-01-14", status: "Published", region: "Ghana" },
    { id: "RAT003", userId: "USER789", rating: 1, comment: "Terrible experience", category: "Transaction Speed", date: "2024-01-13", status: "Under Review", region: "Kenya" }
  ];



  // User Management Functions
  const handleUserStatusChange = (userId: string, action: 'freeze' | 'deactivate' | 'activate') => {
    const user = users.find(u => u.id === userId);
    const actionText = action === 'freeze' ? 'frozen' : action === 'deactivate' ? 'deactivated' : 'activated';
    if (user) {
      showSuccess("User Updated", `${user.firstName} ${user.lastName}'s account has been ${actionText} successfully`);
    }
  };

  const handleUpdateUserContact = () => {
    if (selectedUser) {
      showSuccess("Contact Updated", `Contact information for ${selectedUser.firstName} ${selectedUser.lastName} has been updated successfully`);
      setShowUserDetailsModal(false);
      setUserContactInfo({ phone: "", email: "", alternatePhone: "", alternateEmail: "" });
    }
  };

  const openUserDetails = (user: any) => {
    setSelectedUser(user);
    setUserContactInfo({
      phone: user.phone || "",
      email: user.email || "",
      alternatePhone: "",
      alternateEmail: ""
    });
    setShowUserDetailsModal(true);
  };

  // Filter functions
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedUserType === "all" || user.type.toLowerCase() === selectedUserType.toLowerCase();
    const matchesRegion = selectedRegion === "all" || user.region.toLowerCase() === selectedRegion.toLowerCase();
    
    return matchesSearch && matchesType && matchesRegion;
  });

    

  // Render functions for each page
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Super Admin Dashboard</h2>
          <p className="text-[#64748B]">Platform overview and key metrics</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCwIcon className="w-4 h-4" />
            Refresh Data
          </Button>
          <Button className="bg-[#5B52FF] text-white flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Users</p>
                <p className="text-2xl font-bold text-[#1E293B]">{platformStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12.5% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Transactions</p>
                <p className="text-2xl font-bold text-[#1E293B]">{(platformStats.totalTransactions / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-green-600">+8.3% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Revenue</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦{(platformStats.totalRevenue / 1000000000).toFixed(1)}B</p>
                <p className="text-sm text-green-600">+15.7% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ActivityIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">System Uptime</p>
                <p className="text-2xl font-bold text-[#1E293B]">{platformStats.uptime}%</p>
                <p className="text-sm text-green-600">99.9% SLA target</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Create Admin", icon: <ShieldIcon className="w-5 h-5" />, action: () => setCurrentPage("admin-users") },
              { name: "Manage Users", icon: <UsersIcon className="w-5 h-5" />, action: () => setCurrentPage("users") },
              { name: "View Transactions", icon: <CreditCardIcon className="w-5 h-5" />, action: () => setCurrentPage("transactions") },
              { name: "System Health", icon: <ActivityIcon className="w-5 h-5" />, action: () => setCurrentPage("system-health") },
              { name: "Manage Regions", icon: <GlobeIcon className="w-5 h-5" />, action: () => setCurrentPage("regional") },
              { name: "View Reports", icon: <PieChartIcon className="w-5 h-5" />, action: () => setCurrentPage("reports") }
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col items-center gap-2"
                onClick={action.action}
              >
                {action.icon}
                <span className="text-sm">{action.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Platform Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1E293B]">New admin user created</p>
                <p className="text-sm text-[#64748B]">Sarah Regional Admin added to Ghana region</p>
              </div>
              <span className="text-sm text-[#64748B]">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <DatabaseIcon className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1E293B]">Database maintenance completed</p>
                <p className="text-sm text-[#64748B]">Kenya database optimization finished successfully</p>
              </div>
              <span className="text-sm text-[#64748B]">4 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUpIcon className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1E293B]">Revenue milestone reached</p>
                <p className="text-sm text-[#64748B]">Platform crossed ₦125B in total transaction volume</p>
              </div>
              <span className="text-sm text-[#64748B]">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">User Management</h2>
          <p className="text-[#64748B]">Manage all platform users across all regions and types</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export Users
          </Button>
          <Button 
            className="bg-[#5B52FF] text-white"
            onClick={() => showSuccess("User Created", "New user account has been created successfully")}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Create User
          </Button>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Individual</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.1M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BuildingIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Business</p>
                <p className="text-2xl font-bold text-[#1E293B]">350K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShieldIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Admin</p>
                <p className="text-2xl font-bold text-[#1E293B]">247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Support</p>
                <p className="text-2xl font-bold text-[#1E293B]">150</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <CodeIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Developer</p>
                <p className="text-2xl font-bold text-[#1E293B]">1.2K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <CrownIcon className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">SuperAdmin</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">All Users</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedUserType}
                onChange={(e) => setSelectedUserType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
                <option value="admin">Admin</option>
                <option value="support">Support</option>
                <option value="developer">Developer</option>
                <option value="superadmin">SuperAdmin</option>
              </select>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="all">All Regions</option>
                <option value="nigeria">Nigeria</option>
                <option value="ghana">Ghana</option>
                <option value="kenya">Kenya</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">FIRST NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">MIDDLE NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">EMAIL</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PHONE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST LOGIN</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{user.firstName}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{user.middleName || '-'}</td>
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{user.lastName}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{user.email}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{user.phone}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        user.type === "Individual" ? "bg-blue-100 text-blue-800" :
                        user.type === "Business" ? "bg-green-100 text-green-800" :
                        user.type === "Admin" ? "bg-purple-100 text-purple-800" :
                        user.type === "Support" ? "bg-orange-100 text-orange-800" :
                        user.type === "Developer" ? "bg-indigo-100 text-indigo-800" :
                        "bg-pink-100 text-pink-800"
                      }>
                        {user.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        user.status === "Active" ? "bg-green-100 text-green-800" :
                        user.status === "Frozen" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{user.region}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{user.lastLogin}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openUserDetails(user)}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleUserStatusChange(user.id, 'freeze')}
                        >
                          <PauseIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleUserStatusChange(user.id, 'deactivate')}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  

  // User Details Modal
  const UserDetailsModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#1E293B]">User Details & Management</h3>
          <Button variant="ghost" onClick={() => setShowUserDetailsModal(false)}>
            <XIcon className="w-5 h-5" />
          </Button>
        </div>

        {selectedUser && (
          <div className="space-y-6">
            {/* User Profile */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-[#5B52FF] text-white text-xl">
                      {selectedUser.firstName.charAt(0)}{selectedUser.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-[#1E293B]">
                      {selectedUser.firstName} {selectedUser.middleName} {selectedUser.lastName}
                    </h4>
                    <p className="text-[#64748B]">{selectedUser.email}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge className={
                        selectedUser.type === "Individual" ? "bg-blue-100 text-blue-800" :
                        selectedUser.type === "Business" ? "bg-green-100 text-green-800" :
                        selectedUser.type === "Admin" ? "bg-purple-100 text-purple-800" :
                        selectedUser.type === "Support" ? "bg-orange-100 text-orange-800" :
                        selectedUser.type === "Developer" ? "bg-indigo-100 text-indigo-800" :
                        "bg-pink-100 text-pink-800"
                      }>
                        {selectedUser.type}
                      </Badge>
                      <Badge className={
                        selectedUser.status === "Active" ? "bg-green-100 text-green-800" :
                        selectedUser.status === "Frozen" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {selectedUser.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-[#1E293B] mb-4">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">Primary Phone</label>
                    <Input
                      value={userContactInfo.phone}
                      onChange={(e) => setUserContactInfo({ ...userContactInfo, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">Primary Email</label>
                    <Input
                      value={userContactInfo.email}
                      onChange={(e) => setUserContactInfo({ ...userContactInfo, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">Alternate Phone</label>
                    <Input
                      value={userContactInfo.alternatePhone}
                      onChange={(e) => setUserContactInfo({ ...userContactInfo, alternatePhone: e.target.value })}
                      placeholder="Enter alternate phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">Alternate Email</label>
                    <Input
                      value={userContactInfo.alternateEmail}
                      onChange={(e) => setUserContactInfo({ ...userContactInfo, alternateEmail: e.target.value })}
                      placeholder="Enter alternate email"
                    />
                  </div>
                </div>
                <Button 
                  className="mt-4 bg-[#5B52FF] text-white"
                  onClick={handleUpdateUserContact}
                >
                  Update Contact Information
                </Button>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-[#1E293B] mb-4">Account Actions</h4>
                <div className="grid grid-cols-3 gap-4">
                  <Button 
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-20"
                    onClick={() => handleUserStatusChange(selectedUser.id, 'freeze')}
                  >
                    <PauseIcon className="w-5 h-5" />
                    <span className="text-sm">Freeze Account</span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-20"
                    onClick={() => handleUserStatusChange(selectedUser.id, 'deactivate')}
                  >
                    <XCircleIcon className="w-5 h-5" />
                    <span className="text-sm">Deactivate</span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-20"
                    onClick={() => handleUserStatusChange(selectedUser.id, 'activate')}
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                    <span className="text-sm">Activate</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* User Statistics */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-[#1E293B] mb-4">User Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-[#64748B]">Account Balance</p>
                    <p className="text-xl font-bold text-[#1E293B]">₦{selectedUser.balance.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-[#64748B]">Last Login</p>
                    <p className="text-xl font-bold text-[#1E293B]">{selectedUser.lastLogin}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-[#64748B]">Region</p>
                    <p className="text-xl font-bold text-[#1E293B]">{selectedUser.region}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-[#64748B]">Verification</p>
                    <p className="text-xl font-bold text-[#1E293B]">{selectedUser.kycStatus || selectedUser.kybStatus}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );

  const renderAdminUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Admin User Management</h2>
          <p className="text-[#64748B]">Manage all admin users and their permissions</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Admin User Created", "New admin user has been created and onboarding email sent successfully")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Admin User
        </Button>
      </div>

      {/* Admin Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CrownIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Super Admins</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GlobeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Regional Admins</p>
                <p className="text-2xl font-bold text-[#1E293B]">85</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Support Admins</p>
                <p className="text-2xl font-bold text-[#1E293B]">150</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Admins</p>
                <p className="text-2xl font-bold text-[#1E293B]">247</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Users Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Admin Users</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search admin users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="super">Super Admin</option>
                <option value="regional">Regional Admin</option>
                <option value="support">Support Admin</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">FIRST NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">MIDDLE NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">EMAIL</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PHONE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ROLE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGIONS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST LOGIN</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map((admin) => (
                  <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{admin.firstName}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{admin.middleName}</td>
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{admin.lastName}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{admin.email}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{admin.phone}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        admin.role === "Super Admin" ? "bg-purple-100 text-purple-800" :
                        admin.role === "Regional Admin" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }>
                        {admin.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {admin.regions.map((region, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        admin.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }>
                        {admin.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{admin.lastLogin}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Admin Updated", `${admin.firstName} ${admin.lastName} has been updated successfully`)}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRBAC = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">RBAC & Permissions</h2>
          <p className="text-[#64748B]">Manage roles and permissions for admin users</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Role Created", "New role has been created with assigned permissions successfully")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>

      {/* RBAC Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <KeyIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Roles</p>
                <p className="text-2xl font-bold text-[#1E293B]">15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Permissions</p>
                <p className="text-2xl font-bold text-[#1E293B]">127</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Assigned Users</p>
                <p className="text-2xl font-bold text-[#1E293B]">247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <GlobeIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Regions</p>
                <p className="text-2xl font-bold text-[#1E293B]">10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Roles & Permissions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ROLE NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PERMISSIONS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ASSIGNED USERS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DESCRIPTION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center">
                          <KeyIcon className="w-5 h-5 text-[#5B52FF]" />
                        </div>
                        <span className="font-medium text-[#1E293B]">{role.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{role.permissions} permissions</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{role.users} users</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{role.description}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Role Updated", `${role.name} permissions have been updated successfully`)}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Permission Categories */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Permission Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-[#1E293B] mb-2">User Management</h4>
              <p className="text-sm text-[#64748B] mb-3">Control user accounts, KYC, and verification</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Create Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Edit Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Approve KYC</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-[#1E293B] mb-2">Transaction Control</h4>
              <p className="text-sm text-[#64748B] mb-3">Manage transactions and financial operations</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">View Transactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Reverse Transactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Manage Disputes</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-[#1E293B] mb-2">System Configuration</h4>
              <p className="text-sm text-[#64748B] mb-3">Configure platform settings and features</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">System Settings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Feature Flags</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Regional Config</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Include all other render functions (renderKYC, renderKYB, etc.) - keeping them the same as in the original code
  const renderKYC = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">KYC Management</h2>
          <p className="text-[#64748B]">Manage individual user identity verification</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export KYC Data
          </Button>
          <Button 
            className="bg-[#5B52FF] text-white"
            onClick={() => showSuccess("KYC Approved", "KYC verification has been approved and user has been notified")}
          >
            <CheckCircleIcon className="w-4 h-4 mr-2" />
            Bulk Approve
          </Button>
        </div>
      </div>

      {/* KYC Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileTextIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total KYC Cases</p>
                <p className="text-2xl font-bold text-[#1E293B]">45,623</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Approved</p>
                <p className="text-2xl font-bold text-[#1E293B]">42,156</p>
                <p className="text-sm text-green-600">92.4% approval rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Under Review</p>
                <p className="text-2xl font-bold text-[#1E293B]">2,345</p>
                <p className="text-sm text-yellow-600">Avg 2.4 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Rejected</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,122</p>
                <p className="text-sm text-red-600">2.5% rejection rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KYC Cases Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">KYC Verification Cases</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search KYC cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">USER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CURRENT TIER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REQUESTED TIER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DOCUMENTS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SUBMITTED</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {kycCases.map((kycCase) => (
                  <tr key={kycCase.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[#5B52FF] text-white">
                            {kycCase.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-[#1E293B]">{kycCase.userName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{kycCase.currentTier}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800">{kycCase.requestedTier}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{kycCase.documents} documents</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        kycCase.status === "Approved" ? "bg-green-100 text-green-800" :
                        kycCase.status === "Rejected" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {kycCase.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{kycCase.submittedDate}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{kycCase.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("KYC Approved", `${kycCase.userName}'s KYC has been approved successfully`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("KYC Rejected", `${kycCase.userName}'s KYC has been rejected and user notified`)}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderKYB = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">KYB Management</h2>
          <p className="text-[#64748B]">Manage business verification and compliance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export KYB Data
          </Button>
          <Button 
            className="bg-[#5B52FF] text-white"
            onClick={() => showSuccess("KYB Approved", "Business verification has been approved and business has been notified")}
          >
            <CheckCircleIcon className="w-4 h-4 mr-2" />
            Bulk Approve
          </Button>
        </div>
      </div>

      {/* KYB Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BuildingIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total KYB Cases</p>
                <p className="text-2xl font-bold text-[#1E293B]">12,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Approved</p>
                <p className="text-2xl font-bold text-[#1E293B]">10,234</p>
                <p className="text-sm text-green-600">82.2% approval rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Under Review</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,567</p>
                <p className="text-sm text-yellow-600">Avg 5.2 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Rejected</p>
                <p className="text-2xl font-bold text-[#1E293B]">655</p>
                <p className="text-sm text-red-600">5.3% rejection rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KYB Cases Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Business Verification Cases</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search KYB cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">BUSINESS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CURRENT TIER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REQUESTED TIER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DOCUMENTS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SUBMITTED</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {kybCases.map((kybCase) => (
                  <tr key={kybCase.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center">
                          <BuildingIcon className="w-5 h-5 text-[#5B52FF]" />
                        </div>
                        <span className="font-medium text-[#1E293B]">{kybCase.businessName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{kybCase.currentTier}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800">{kybCase.requestedTier}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{kybCase.documents} documents</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        kybCase.status === "Approved" ? "bg-green-100 text-green-800" :
                        kybCase.status === "Rejected" ? "bg-red-100 text-red-800" :
                        kybCase.status === "Under Review" ? "bg-yellow-100 text-yellow-800" :
                        "bg-orange-100 text-orange-800"
                      }>
                        {kybCase.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{kybCase.submittedDate}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{kybCase.region}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("KYB Approved", `${kybCase.businessName}'s KYB has been approved successfully`)}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("KYB Rejected", `${kybCase.businessName}'s KYB has been rejected and business notified`)}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Add all other render functions here (keeping them the same as original)
  const renderRegional = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Regional Management</h2>
          <p className="text-[#64748B]">Manage multi-regional platform with separate databases</p>
        </div>
        <Button 
          className="bg-[#5B52FF] text-white"
          onClick={() => showSuccess("Region Added", "New region has been added with separate database successfully")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Region
        </Button>
      </div>

      {/* Regional Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GlobeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Regions</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Regions</p>
                <p className="text-2xl font-bold text-[#1E293B]">10</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Pending Setup</p>
                <p className="text-2xl font-bold text-[#1E293B]">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DatabaseIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Databases</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regions Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Regional Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">REGION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CODE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">USERS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ADMINS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DATABASE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST UPDATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((region) => (
                  <tr key={region.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center">
                          <MapPinIcon className="w-5 h-5 text-[#5B52FF]" />
                        </div>
                        <span className="font-medium text-[#1E293B]">{region.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{region.code}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{region.users.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{region.admins}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        region.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }>
                        {region.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{region.database}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{region.lastUpdate}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Region Updated", `${region.name} region configuration has been updated successfully`)}
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Add placeholder render functions for remaining pages
  const renderBulkData = () => <div>Bulk Data Management - Implementation continues...</div>;
  const renderApprovalWorkflow = () => <div>Approval Workflow - Implementation continues...</div>;
  const renderTransactions = () => <div>Transaction Management - Implementation continues...</div>;
  const renderCards = () => <div>Card Management - Implementation continues...</div>;
  const renderThirdParty = () => <div>Third Party Integration - Implementation continues...</div>;
  const renderAPI = () => <div>API Management - Implementation continues...</div>;
  const renderDeveloper = () => <div>Developer Tools - Implementation continues...</div>;
  const renderMarketplace = () => <div>Marketplace - Implementation continues...</div>;
  const renderDatabase = () => <div>Database Management - Implementation continues...</div>;
  const renderSystemHealth = () => <div>System Health - Implementation continues...</div>;
  const renderSubscription = () => <div>Subscription Management - Implementation continues...</div>;
  const renderSystemLogs = () => <div>System Logs - Implementation continues...</div>;
  const renderProfile = () => <div>Profile Settings - Implementation continues...</div>;
  const renderWallet = () => <div>Wallet Management - Implementation continues...</div>;
  const renderEscrow = () => <div>Escrow Management - Implementation continues...</div>;
  const renderBackgroundCheck = () => <div>Background Check - Implementation continues...</div>;
  const renderReports = () => <div>Reports & Analytics - Implementation continues...</div>;
  const renderDisputes = () => <div>Dispute Management - Implementation continues...</div>;
  const renderChat = () => <div>Chat Management - Implementation continues...</div>;
  const renderEmail = () => <div>Email Management - Implementation continues...</div>;
  const renderNotifications = () => <div>Notification Management - Implementation continues...</div>;
  const renderTickets = () => <div>Ticketing System - Implementation continues...</div>;
  const renderWhiteLabel = () => <div>White Labelling - Implementation continues...</div>;
  const renderReferrals = () => <div>Referrals Management - Implementation continues...</div>;
  const renderRewards = () => <div>Reward Management - Implementation continues...</div>;
  const renderRatings = () => <div>Ratings Management - Implementation continues...</div>;
  const renderDocuments = () => <div>Document Management - Implementation continues...</div>;
  const renderSecurity = () => <div>Security Center - Implementation continues...</div>;
  const renderContent = () => <div>Content Management - Implementation continues...</div>;
  const renderDowntime = () => <div>Downtime Tracker - Implementation continues...</div>;

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard": return renderDashboard();
      case "admin-users": return renderAdminUsers();
      case "rbac": return renderRBAC();
      case "users": return renderUsers();
      case "kyc": return renderKYC();
      case "kyb": return renderKYB();
      case "regional": return renderRegional();
      case "bulk-data": return renderBulkData();
      case "approval-workflow": return renderApprovalWorkflow();
      case "transactions": return renderTransactions();
      case "cards": return renderCards();
      case "pos": return <PosManagement />;
      case "third-party": return renderThirdParty();
      case "api": return renderAPI();
      case "developer": return renderDeveloper();
      case "marketplace": return renderMarketplace();
      case "database": return renderDatabase();
      case "system-health": return renderSystemHealth();
      case "subscription": return renderSubscription();
      case "system-logs": return renderSystemLogs();
      case "profile": return renderProfile();
      case "wallet": return renderWallet();
      case "escrow": return renderEscrow();
      case "background-check": return renderBackgroundCheck();
      case "reports": return renderReports();
      case "disputes": return renderDisputes();
      case "chat": return renderChat();
      case "email": return renderEmail();
      case "notifications": return renderNotifications();
      case "tickets": return renderTickets();
      case "white-label": return renderWhiteLabel();
      case "referrals": return renderReferrals();
      case "rewards": return renderRewards();
      case "ratings": return renderRatings();
      case "documents": return renderDocuments();
      case "security": return renderSecurity();
      case "content": return renderContent();
      case "downtime": return renderDowntime();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Success Modal with Blur Background */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9998]">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircleIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">{successMessage.title}</h3>
            <p className="text-[#64748B] mb-6">{successMessage.message}</p>
            <Button 
              onClick={() => setShowSuccessModal(false)}
              className="bg-[#5B52FF] text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      )}



      {/* User Details Modal */}
      {showUserDetailsModal && <UserDetailsModal />}

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <CrownIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-[#1E293B]">Super Admin</h1>
                <p className="text-xs text-[#64748B]">Platform Control</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            {/* Account Type Switcher */}
            <div className="mb-4">
              <AccountTypeSwitcher variant="sidebar" />
            </div>

            <div className="space-y-1">
              {superAdminNavItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                    currentPage === item.id
                      ? "bg-[#5B52FF] text-white"
                      : "text-[#64748B] hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{item.name}</span>

                    </div>
                    <p className="text-xs opacity-70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </nav>

          <div className="p-4">
            <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <CrownIcon className="w-8 h-8" />
                  <div>
                    <p className="font-semibold">Super Admin</p>
                    <p className="text-sm opacity-80">Full Platform Access</p>
                  </div>
                </div>
                <p className="text-sm opacity-90 mb-3">
                  You have complete control over the SureBanker platform
                </p>
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30">
                  Platform Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-[#1E293B]">
                    {superAdminNavItems.find(item => item.id === currentPage)?.name || "Super Admin Dashboard"}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <AccountTypeSwitcher variant="header" />
                
                <Button variant="ghost" size="sm" className="p-2">
                  <SearchIcon className="w-5 h-5 text-[#64748B]" />
                </Button>
                
                <div className="relative">
                  <Button variant="ghost" size="sm" className="p-2">
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    3
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <ProfileDropdown
                    userName={getUserDisplayName()}
                    userRole="Super Administrator"
                    avatar={getUserInitials()}
                    profileRoute="/super-admin-profile"
                    logoutRoute="/signIn"
                    accountType="super-admin"
                  />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            {renderCurrentPage()}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <CrownIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Super Admin</h1>
              <p className="text-xs text-[#64748B]">Platform Control</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                3
              </Badge>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20">
          {/* Mobile Navigation Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {superAdminNavItems.slice(0, 8).map((item) => (
              <Card 
                key={item.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setCurrentPage(item.id)}
              >
                <CardContent className="p-4 text-center relative">

                  <div className="w-10 h-10 bg-[#5B52FF] rounded-lg flex items-center justify-center mx-auto mb-2 text-white">
                    {item.icon}
                  </div>
                  <p className="text-sm font-medium text-[#1E293B]">{item.name}</p>
                  <p className="text-xs text-[#64748B]">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Current Page Content */}
          {renderCurrentPage()}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {[
              { name: "Dashboard", icon: <HomeIcon className="w-6 h-6" />, page: "dashboard" },
              { name: "Users", icon: <UsersIcon className="w-6 h-6" />, page: "users" },
              { name: "Analytics", icon: <BarChart3Icon className="w-6 h-6" />, page: "system-health" },
              { name: "Settings", icon: <SettingsIcon className="w-6 h-6" />, page: "profile" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center py-2 cursor-pointer"
                onClick={() => setCurrentPage(item.page)}
              >
                <div className={`${currentPage === item.page ? 'text-[#5B52FF]' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 ${currentPage === item.page ? 'text-[#5B52FF] font-medium' : 'text-gray-400'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};