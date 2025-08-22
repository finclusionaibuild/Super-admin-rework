import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { 
  BellIcon, 
  SearchIcon, 
  ArrowLeftIcon, 
  CheckCircleIcon, 
  AlertTriangleIcon, 
  InfoIcon, 
  XCircleIcon, 
  ClockIcon, 
  ShieldIcon, 
  CreditCardIcon, 
  UserIcon, 
  SettingsIcon, 
  TrendingUpIcon, 
  FilterIcon, 
  MoreHorizontalIcon, 
  TrashIcon, 
  ArchiveIcon, 
  BookMarkedIcon as MarkAsUnreadIcon, 
  HomeIcon, 
  ReceiptIcon, 
  PiggyBankIcon, 
  BarChart3Icon, 
  HandshakeIcon, 
  InboxIcon, 
  StarIcon, 
  ChevronDownIcon,
  CrownIcon,
  HeadphonesIcon,
  CodeIcon,
  BuildingIcon,
  DatabaseIcon,
  ServerIcon,
  KeyIcon,
  GlobeIcon,
  FileTextIcon,
  UsersIcon,
  TicketIcon,
  MessageSquareIcon,
  MailIcon,
  PaletteIcon,
  GiftIcon,
  FolderIcon,
  LockIcon,
  MonitorIcon,
  WifiOffIcon,
  DollarSignIcon,
  ActivityIcon,
  RefreshCwIcon,
  XIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  CalendarIcon,
  BellRingIcon,
  MessageCircleIcon,
  Users2Icon,
  HeartIcon,
  ThumbsUpIcon,
  ShareIcon,
  LinkIcon,
  ExternalLinkIcon,
  PlayIcon,
  PauseIcon,
  FastForwardIcon,
  RewindIcon,
  SkipForwardIcon,
  SkipBackIcon,
  RepeatIcon,
  ShuffleIcon,
  Maximize2Icon,
  Minimize2Icon,
  ZoomInIcon,
  ZoomOutIcon,
  RotateCcwIcon,
  RotateCwIcon,
  FlipHorizontalIcon,
  FlipVerticalIcon,
  CropIcon,
  ScissorsIcon,
  PaintbrushIcon as PaintBrushIcon,
  ImageIcon,
  FileIcon,
  CloudIcon,
  WifiIcon,
  BluetoothIcon,
  UsbIcon,
  HardDriveIcon,
  CpuIcon,
  MemoryStickIcon,
  KeyboardIcon,
  MouseIcon,
  PrinterIcon,
  ScanIcon as ScannerIcon,
  CameraIcon,
  VideoIcon,
  MicIcon,
  SpeakerIcon,
  RadioIcon,
  TvIcon,
  GamepadIcon,
  JoystickIcon,
  DicesIcon,
  PuzzleIcon,
  TrophyIcon,
  MedalIcon,
  AwardIcon,
  FlagIcon,
  MapIcon,
  CompassIcon,
  NavigationIcon,
  RouteIcon,
  CarIcon,
  TruckIcon,
  BusIcon,
  TrainIcon,
  PlaneIcon,
  ShipIcon,
  BikeIcon,
  MilkIcon as WalkIcon,
  SunIcon as RunIcon,
  SunDimIcon as SwimIcon,
  FishIcon,
  TreesIcon as TreeIcon,
  FlowerIcon,
  LeafIcon,
  ScalingIcon as SeedlingIcon,
  SunIcon as Sun2Icon,
  MoonIcon as Moon2Icon,
  StarIcon as Star2Icon,
  CloudRainIcon,
  CloudSnowIcon,
  ZapIcon,
  FlameIcon,
  DropletIcon,
  WindIcon,
  EyeIcon as Eye2Icon,
  EarIcon,
  HouseIcon as NoseIcon,
  SmileIcon,
  FrownIcon,
  MehIcon,
  AngryIcon,
  LaughIcon,
  AngryIcon as CryIcon,
  RssIcon as KissIcon,
  HeartIcon as HeartEyesIcon,
  GlassesIcon as SunglassesIcon,
  BirdIcon as NerdIcon,
  HeadingIcon as ThinkingIcon,
  Icon as ZzzIcon,
  DockIcon as SickIcon,
  BedIcon as InjuredIcon,
  SaladIcon as DeadIcon,
  GhostIcon,
  PenIcon as AlienIcon,
  BotIcon as RobotIcon,
  FilterIcon as MonsterIcon,
  HexagonIcon as DragonIcon,
  PopcornIcon as UnicornIcon,
  HouseIcon as HorseIcon,
  DogIcon,
  CatIcon,
  MouseIcon as Mouse2Icon,
  HammerIcon as HamsterIcon,
  RabbitIcon,
  BoxIcon as FoxIcon,
  Icon as WolfIcon,
  OptionIcon as LionIcon,
  TimerIcon as TigerIcon,
  AwardIcon as LeopardIcon,
  HouseIcon as Horse2Icon,
  PopcornIcon as Unicorn2Icon,
  DramaIcon as ZebraIcon,
  BeerIcon as DeerIcon,
  ChartGanttIcon as ElephantIcon,
  PianoIcon as RhinoIcon,
  Icon as HippoIcon,
  FileIcon as CrocodileIcon,
  TurtleIcon,
  AwardIcon as LizardIcon,
  CakeIcon as SnakeIcon,
  HexagonIcon as Dragon2Icon,
  CropIcon as SauropodIcon,
  RegexIcon as TRexIcon,
  BirdIcon,
  FileIcon as EagleIcon,
  TruckIcon as DuckIcon,
  BanIcon as SwanIcon,
  Icon as OwlIcon,
  MoveIcon as DoveIcon,
  CrownIcon as CrowIcon,
  DockIcon as PeacockIcon,
  CarrotIcon as ParrotIcon,
  FlameIcon as FlamingoIcon,
  PenIcon as PenguinIcon,
  CheckIcon as ChickIcon,
  CatIcon as HatIcon,
  ReplaceIcon as NecklaceIcon,
  BellRingIcon as RingIcon,
  WatchIcon,
  TagIcon as BagIcon,
  BackpackIcon,
  BriefcaseIcon,
  BriefcaseIcon as SuitcaseIcon,
  UmbrellaIcon,
  PlaneIcon as CaneIcon,
  MoveIcon as GloveIcon,
  DockIcon as SockIcon,
  PhoneIcon as ShoeIcon,
  BotIcon as BootIcon,
  MedalIcon as SandalIcon,
  BellIcon as HighHeelIcon,
  TreesIcon as DressIcon,
  ShirtIcon,
  AxeIcon as TieIcon,
  PocketIcon as JacketIcon,
  CatIcon as CoatIcon,
  ScanIcon as ScarfIcon,
  UtensilsIcon as MittensIcon,
  WaypointsIcon as PantsIcon,
  ShirtIcon as ShortsIcon,
  ShirtIcon as SkirtIcon,
  MartiniIcon as BikiniIcon,
  CarIcon as SwimwearIcon,
  WormIcon as UniformIcon,
  MoonIcon as ApronIcon,
  CatIcon as LabCoatIcon,
  CastIcon as SafetyVestIcon,
  HardHatIcon,
  VenetianMaskIcon as MaskIcon,
  FilesIcon as GogglesIcon,
  EarOffIcon as EarmuffsIcon,
  HeadsetIcon as HelmetIcon,
  CrownIcon as Crown2Icon,
  SortAscIcon,
  SortDescIcon,
  GridIcon,
  ListIcon,
  PinIcon,
  PinIcon as UnpinIcon,
  SmartphoneIcon,
  VolumeXIcon,
  Volume2Icon,
  MoonIcon,
  SunIcon,
  VibrateIcon,
  BellOffIcon,
  DownloadIcon
} from "lucide-react";

interface NotificationItem {
  id: string;
  type: 'transaction' | 'security' | 'savings' | 'promotional' | 'system' | 'social' | 'card' | 'bill' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  icon: React.ReactNode;
  color: string;
  actionable: boolean;
  actionText?: string;
  actionUrl?: string;
  metadata?: {
    amount?: string;
    transactionId?: string;
    location?: string;
    device?: string;
    goalName?: string;
    progress?: number;
    expiryDate?: string;
    category?: string;
  };
  attachments?: {
    type: 'image' | 'document' | 'receipt';
    url: string;
    name: string;
  }[];
}

interface NotificationStats {
  total: number;
  unread: number;
  starred: number;
  urgent: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  archived: number;
}

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: string;
  icon: React.ReactNode;
  color: string;
}

export const Notifications = (): JSX.Element => {
  const { currentAccount, isBusinessAccount } = useAccount();
  const navigate = useNavigate();
  
  // State management
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<NotificationItem[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState("time");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"list" | "grid" | "compact">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedNotifications, setExpandedNotifications] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  // Settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,
    quietHours: {
      enabled: false,
      start: "22:00",
      end: "07:00"
    },
    categories: {
      transaction: true,
      security: true,
      savings: true,
      promotional: false,
      system: true,
      social: true,
      card: true,
      bill: true,
      achievement: true
    },
    frequency: "immediate", // immediate, hourly, daily, weekly
    vipSenders: [] as string[],
    blockedSenders: [] as string[]
  });

  // Get user type from localStorage or account context
  const demoUser = JSON.parse(localStorage.getItem('demoUser') || '{}');
  const userType = demoUser.role || (isBusinessAccount ? 'business' : 'individual');

  // Different notifications based on user type
  const getNotificationsForUserType = () => {
    switch (userType) {
      case 'Super Admin':
        return [
          {
            id: "1",
            type: "system",
            title: "Critical System Alert",
            message: "Database performance degradation detected in Nigeria region. Immediate attention required.",
            timestamp: "5 minutes ago",
            isRead: false,
            priority: "high",
            icon: <AlertTriangleIcon className="w-5 h-5" />,
            color: "text-red-600"
          },
          {
            id: "2",
            type: "security",
            title: "Security Breach Attempt",
            message: "Multiple failed admin login attempts detected from IP 192.168.1.100. Account temporarily locked.",
            timestamp: "1 hour ago",
            isRead: false,
            priority: "high",
            icon: <ShieldIcon className="w-5 h-5" />,
            color: "text-red-600"
          },
          {
            id: "3",
            type: "admin",
            title: "New Admin User Created",
            message: "Regional Admin 'Sarah Wilson' has been created for Ghana region with full permissions.",
            timestamp: "3 hours ago",
            isRead: true,
            priority: "medium",
            icon: <UserIcon className="w-5 h-5" />,
            color: "text-blue-600"
          },
          {
            id: "4",
            type: "system",
            title: "Platform Milestone Reached",
            message: "SureBanker has reached 2.5 million registered users across all regions. Congratulations!",
            timestamp: "1 day ago",
            isRead: true,
            priority: "low",
            icon: <TrendingUpIcon className="w-5 h-5" />,
            color: "text-green-600"
          },
          {
            id: "5",
            type: "maintenance",
            title: "Scheduled Maintenance Complete",
            message: "Database optimization for Kenya region has been completed successfully. Performance improved by 15%.",
            timestamp: "2 days ago",
            isRead: true,
            priority: "medium",
            icon: <DatabaseIcon className="w-5 h-5" />,
            color: "text-blue-600"
          }
        ];

      case 'Admin':
        return [
          {
            id: "1",
            type: "user",
            title: "KYC Verification Pending",
            message: "15 KYC verification requests are pending review and require immediate attention.",
            timestamp: "30 minutes ago",
            isRead: false,
            priority: "high",
            icon: <FileTextIcon className="w-5 h-5" />,
            color: "text-orange-600"
          },
          {
            id: "2",
            type: "transaction",
            title: "Large Transaction Alert",
            message: "Transaction of ₦5,000,000 flagged for manual review. User: Business Corp Ltd.",
            timestamp: "2 hours ago",
            isRead: false,
            priority: "high",
            icon: <CreditCardIcon className="w-5 h-5" />,
            color: "text-red-600"
          },
          {
            id: "3",
            type: "system",
            title: "User Account Suspended",
            message: "User account 'suspicious_user_123' has been automatically suspended due to fraudulent activity.",
            timestamp: "4 hours ago",
            isRead: true,
            priority: "medium",
            icon: <ShieldIcon className="w-5 h-5" />,
            color: "text-yellow-600"
          },
          {
            id: "4",
            type: "report",
            title: "Daily Admin Report Ready",
            message: "Your daily administrative report for Nigeria region is now available for download.",
            timestamp: "1 day ago",
            isRead: true,
            priority: "low",
            icon: <BarChart3Icon className="w-5 h-5" />,
            color: "text-blue-600"
          }
        ];

      case 'Customer Support':
        return [
          {
            id: "1",
            type: "ticket",
            title: "High Priority Ticket Assigned",
            message: "Ticket #TIC001 'Login Issues' has been assigned to you. Customer is waiting for response.",
            timestamp: "15 minutes ago",
            isRead: false,
            priority: "high",
            icon: <TicketIcon className="w-5 h-5" />,
            color: "text-red-600"
          },
          {
            id: "2",
            type: "chat",
            title: "New Chat Request",
            message: "Customer 'John Doe' is requesting live chat support for payment issues.",
            timestamp: "45 minutes ago",
            isRead: false,
            priority: "medium",
            icon: <MessageSquareIcon className="w-5 h-5" />,
            color: "text-blue-600"
          },
          {
            id: "3",
            type: "escalation",
            title: "Ticket Escalated",
            message: "Ticket #TIC002 has been escalated to Level 2 support due to complexity.",
            timestamp: "2 hours ago",
            isRead: true,
            priority: "medium",
            icon: <TrendingUpIcon className="w-5 h-5" />,
            color: "text-orange-600"
          },
          {
            id: "4",
            type: "achievement",
            title: "Customer Satisfaction Goal Met",
            message: "Congratulations! You've achieved 4.9/5 customer satisfaction rating this month.",
            timestamp: "1 day ago",
            isRead: true,
            priority: "low",
            icon: <StarIcon className="w-5 h-5" />,
            color: "text-green-600"
          }
        ];

      case 'Developer Account':
        return [
          {
            id: "1",
            type: "api",
            title: "API Rate Limit Warning",
            message: "Your API usage is approaching the daily limit. Current usage: 8,500/10,000 calls.",
            timestamp: "1 hour ago",
            isRead: false,
            priority: "high",
            icon: <CodeIcon className="w-5 h-5" />,
            color: "text-orange-600"
          },
          {
            id: "2",
            type: "sandbox",
            title: "Sandbox Environment Updated",
            message: "Your sandbox environment has been updated with the latest API version v2.1.",
            timestamp: "3 hours ago",
            isRead: false,
            priority: "medium",
            icon: <ServerIcon className="w-5 h-5" />,
            color: "text-blue-600"
          },
          {
            id: "3",
            type: "webhook",
            title: "Webhook Delivery Failed",
            message: "Webhook delivery to https://yourapp.com/webhook failed. Please check your endpoint.",
            timestamp: "6 hours ago",
            isRead: true,
            priority: "medium",
            icon: <AlertTriangleIcon className="w-5 h-5" />,
            color: "text-red-600"
          },
          {
            id: "4",
            type: "documentation",
            title: "New API Documentation Available",
            message: "Updated API documentation for Payment Gateway v2.1 is now available in the developer portal.",
            timestamp: "2 days ago",
            isRead: true,
            priority: "low",
            icon: <FileTextIcon className="w-5 h-5" />,
            color: "text-green-600"
          },
          {
            id: "5",
            type: "security",
            title: "API Key Rotation Reminder",
            message: "Your API key expires in 30 days. Please rotate your keys to maintain security.",
            timestamp: "3 days ago",
            isRead: true,
            priority: "medium",
            icon: <KeyIcon className="w-5 h-5" />,
            color: "text-yellow-600"
          }
        ];

      case 'Customer (Business Account)':
        return [
          {
            id: "1",
            type: "kyb",
            title: "KYB Tier 3 Upgrade Available",
            message: "Upgrade to KYB Tier 3 to unlock payroll management, bulk transfers, and business loans.",
            timestamp: "2 hours ago",
            isRead: false,
            priority: "high",
            icon: <BuildingIcon className="w-5 h-5" />,
            color: "text-blue-600"
          },
          {
            id: "2",
            type: "payroll",
            title: "Payroll Processing Complete",
            message: "Monthly payroll for 25 employees has been processed successfully. Total: ₦2,450,000",
            timestamp: "1 day ago",
            isRead: false,
            priority: "medium",
            icon: <UsersIcon className="w-5 h-5" />,
            color: "text-green-600"
          },
          {
            id: "3",
            type: "approval",
            title: "Bulk Transfer Requires Approval",
            message: "Bulk transfer of ₦1,200,000 to 15 vendors is pending your approval.",
            timestamp: "3 hours ago",
            isRead: true,
            priority: "high",
            icon: <CheckCircleIcon className="w-5 h-5" />,
            color: "text-orange-600"
          },
          {
            id: "4",
            type: "loan",
            title: "Business Loan Pre-Approved",
            message: "Congratulations! You're pre-approved for a business loan up to ₦50,000,000.",
            timestamp: "2 days ago",
            isRead: true,
            priority: "low",
            icon: <DollarSignIcon className="w-5 h-5" />,
            color: "text-green-600"
          }
        ];

      default: // Individual Customer
        return [
    {
      id: "1",
      type: "kyc",
      title: "Complete Your KYC Verification",
      message: "Upgrade to KYC Tier 2 to unlock higher transaction limits and card requests.",
      timestamp: "1 hour ago",
      isRead: false,
      priority: "high",
      icon: <UserIcon className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      id: "2",
      type: "transaction",
      title: "Transaction Successful",
      message: "Your transfer of ₦50,000 to John Doe has been completed successfully.",
      timestamp: "2 hours ago",
      isRead: false,
      priority: "medium",
      icon: <CheckCircleIcon className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      id: "3",
      type: "security",
      title: "Security Alert",
      message: "New device login detected from Lagos, Nigeria. If this wasn't you, please secure your account immediately.",
      timestamp: "4 hours ago",
      isRead: true,
      priority: "high",
      icon: <ShieldIcon className="w-5 h-5" />,
      color: "text-red-600"
    },
    {
      id: "4",
      type: "promotion",
      title: "Cashback Reward Available",
      message: "You've earned ₦500 cashback on your recent transactions. Claim your reward now!",
      timestamp: "1 day ago",
      isRead: true,
      priority: "low",
      icon: <GiftIcon className="w-5 h-5" />,
      color: "text-purple-600"
    },
    {
      id: "5",
      type: "savings",
      title: "Savings Goal Achievement",
      message: "Congratulations! You've reached 80% of your vacation fund savings goal.",
      timestamp: "2 days ago",
      isRead: true,
      priority: "low",
      icon: <PiggyBankIcon className="w-5 h-5" />,
      color: "text-green-600"
    }
        ];
    }
  };

  const notificationsList = getNotificationsForUserType();

  // Sample notification data
  const sampleNotifications: NotificationItem[] = [
    {
      id: "1",
      type: "transaction",
      title: "Payment Received",
      message: "You received ₦50,000 from John Doe for freelance work. The funds are now available in your account.",
      timestamp: "2 minutes ago",
      isRead: false,
      isStarred: false,
      isArchived: false,
      priority: "medium",
      icon: <DollarSignIcon className="w-5 h-5" />,
      color: "text-green-600",
      actionable: true,
      actionText: "View Transaction",
      actionUrl: "/transactions",
      metadata: {
        amount: "₦50,000",
        transactionId: "TXN123456789",
        location: "Online Transfer"
      }
    },
    {
      id: "2",
      type: "security",
      title: "New Device Login",
      message: "Your account was accessed from a new device (iPhone 15 Pro) in Lagos, Nigeria. If this wasn't you, please secure your account immediately.",
      timestamp: "1 hour ago",
      isRead: false,
      isStarred: true,
      isArchived: false,
      priority: "urgent",
      icon: <ShieldIcon className="w-5 h-5" />,
      color: "text-red-600",
      actionable: true,
      actionText: "Review Security",
      actionUrl: "/profile",
      metadata: {
        device: "iPhone 15 Pro",
        location: "Lagos, Nigeria"
      }
    },
    {
      id: "3",
      type: "savings",
      title: "Savings Goal Achieved! 🎉",
      message: "Congratulations! You've reached your 'Emergency Fund' savings goal of ₦100,000. Time to set a new goal!",
      timestamp: "3 hours ago",
      isRead: true,
      isStarred: true,
      isArchived: false,
      priority: "high",
      icon: <TrophyIcon className="w-5 h-5" />,
      color: "text-purple-600",
      actionable: true,
      actionText: "Set New Goal",
      actionUrl: "/sure-savings",
      metadata: {
        goalName: "Emergency Fund",
        progress: 100
      }
    },
    {
      id: "4",
      type: "promotional",
      title: "Cashback Reward Available",
      message: "You've earned ₦2,500 cashback on your recent transactions! Claim your reward now before it expires on Dec 31st.",
      timestamp: "6 hours ago",
      isRead: false,
      isStarred: false,
      isArchived: false,
      priority: "medium",
      icon: <GiftIcon className="w-5 h-5" />,
      color: "text-orange-600",
      actionable: true,
      actionText: "Claim Reward",
      actionUrl: "/rewards",
      metadata: {
        amount: "₦2,500",
        expiryDate: "Dec 31, 2024"
      }
    },
    {
      id: "5",
      type: "card",
      title: "Card Transaction Alert",
      message: "Your SureBanker Visa card was used for a ₦15,000 purchase at Amazon. Transaction approved.",
      timestamp: "1 day ago",
      isRead: true,
      isStarred: false,
      isArchived: false,
      priority: "low",
      icon: <CreditCardIcon className="w-5 h-5" />,
      color: "text-blue-600",
      actionable: true,
      actionText: "View Card Activity",
      actionUrl: "/cards",
      metadata: {
        amount: "₦15,000",
        location: "Amazon (Online)"
      }
    },
    {
      id: "6",
      type: "bill",
      title: "Bill Payment Successful",
      message: "Your DSTV subscription payment of ₦4,500 has been processed successfully. Service active until Jan 15, 2025.",
      timestamp: "1 day ago",
      isRead: true,
      isStarred: false,
      isArchived: false,
      priority: "low",
      icon: <TvIcon className="w-5 h-5" />,
      color: "text-green-600",
      actionable: true,
      actionText: "View Bills",
      actionUrl: "/payments",
      metadata: {
        amount: "₦4,500",
        category: "Entertainment"
      }
    },
    {
      id: "7",
      type: "achievement",
      title: "Spending Streak! 🔥",
      message: "You've maintained your budget for 30 consecutive days! Keep up the great financial discipline.",
      timestamp: "2 days ago",
      isRead: true,
      isStarred: true,
      isArchived: false,
      priority: "medium",
      icon: <FlameIcon className="w-5 h-5" />,
      color: "text-yellow-600",
      actionable: true,
      actionText: "View Budget",
      actionUrl: "/sure-budget",
      metadata: {
        progress: 30
      }
    },
    {
      id: "8",
      type: "social",
      title: "Friend Request",
      message: "Sarah Wilson wants to connect with you on SureBanker. Accept to start sharing expenses and splitting bills.",
      timestamp: "3 days ago",
      isRead: false,
      isStarred: false,
      isArchived: false,
      priority: "low",
      icon: <Users2Icon className="w-5 h-5" />,
      color: "text-indigo-600",
      actionable: true,
      actionText: "View Request",
      actionUrl: "/social"
    },
    {
      id: "9",
      type: "system",
      title: "App Update Available",
      message: "SureBanker v2.1.0 is now available with enhanced security features and improved performance. Update now!",
      timestamp: "1 week ago",
      isRead: true,
      isStarred: false,
      isArchived: false,
      priority: "medium",
      icon: <DownloadIcon className="w-5 h-5" />,
      color: "text-blue-600",
      actionable: true,
      actionText: "Update App",
      actionUrl: "/settings"
    },
    {
      id: "10",
      type: "transaction",
      title: "Large Transaction Alert",
      message: "You sent ₦250,000 to ABC Company Ltd. This transaction required additional verification due to the amount.",
      timestamp: "1 week ago",
      isRead: true,
      isStarred: false,
      isArchived: false,
      priority: "high",
      icon: <AlertTriangleIcon className="w-5 h-5" />,
      color: "text-orange-600",
      actionable: true,
      actionText: "View Details",
      actionUrl: "/transactions",
      metadata: {
        amount: "₦250,000",
        transactionId: "TXN987654321"
      }
    },
    {
      id: "11",
      type: "savings",
      title: "Auto-Save Activated",
      message: "Your weekly auto-save of ₦5,000 has been transferred to your Emergency Fund. Current balance: ₦45,000.",
      timestamp: "1 week ago",
      isRead: true,
      isStarred: false,
      isArchived: false,
      priority: "low",
      icon: <PiggyBankIcon className="w-5 h-5" />,
      color: "text-green-600",
      actionable: true,
      actionText: "View Savings",
      actionUrl: "/sure-savings",
      metadata: {
        amount: "₦5,000",
        goalName: "Emergency Fund"
      }
    },
    {
      id: "12",
      type: "promotional",
      title: "Refer & Earn Bonus",
      message: "Invite friends to SureBanker and earn ₦1,000 for each successful referral. No limit on earnings!",
      timestamp: "2 weeks ago",
      isRead: true,
      isStarred: false,
      isArchived: false,
      priority: "low",
      icon: <ShareIcon className="w-5 h-5" />,
      color: "text-purple-600",
      actionable: true,
      actionText: "Start Referring",
      actionUrl: "/referrals"
    },
    {
      id: "13",
      type: "card",
      title: "Card Spending Limit Reached",
      message: "You've reached 90% of your monthly spending limit (₦45,000/₦50,000) on your Visa card. Consider adjusting your limit.",
      timestamp: "2 weeks ago",
      isRead: true,
      isStarred: false,
      isArchived: false,
      priority: "medium",
      icon: <AlertTriangleIcon className="w-5 h-5" />,
      color: "text-yellow-600",
      actionable: true,
      actionText: "Manage Limits",
      actionUrl: "/cards",
      metadata: {
        progress: 90
      }
    },
    {
      id: "14",
      type: "security",
      title: "Password Changed Successfully",
      message: "Your account password was changed successfully from your registered device. Your account remains secure.",
      timestamp: "3 weeks ago",
      isRead: true,
      isStarred: false,
      isArchived: false,
      priority: "low",
      icon: <CheckCircleIcon className="w-5 h-5" />,
      color: "text-green-600",
      actionable: false
    },
    {
      id: "15",
      type: "achievement",
      title: "First Transfer Milestone! 🎯",
      message: "Congratulations on completing your first money transfer! You're now part of the SureBanker community.",
      timestamp: "1 month ago",
      isRead: true,
      isStarred: true,
      isArchived: false,
      priority: "low",
      icon: <TrophyIcon className="w-5 h-5" />,
      color: "text-gold-600",
      actionable: true,
      actionText: "View Achievements",
      actionUrl: "/achievements"
    }
  ];

  // Initialize notifications
  useEffect(() => {
    setNotifications(sampleNotifications);
    setFilteredNotifications(sampleNotifications);
  }, []);

  // Calculate statistics
  const calculateStats = (): NotificationStats => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    return {
      total: notifications.length,
      unread: notifications.filter(n => !n.isRead).length,
      starred: notifications.filter(n => n.isStarred).length,
      urgent: notifications.filter(n => n.priority === 'urgent').length,
      today: notifications.filter(n => n.timestamp.includes('minutes ago') || n.timestamp.includes('hour')).length,
      thisWeek: notifications.filter(n => !n.timestamp.includes('week') && !n.timestamp.includes('month')).length,
      thisMonth: notifications.length,
      archived: notifications.filter(n => n.isArchived).length
    };
  };

  const stats = calculateStats();

  // Filter and search functionality
  useEffect(() => {
    let filtered = notifications.filter(notification => {
      // Filter by category
      if (currentFilter !== "all" && notification.type !== currentFilter) return false;
      
      // Filter by search query
      if (searchQuery && !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !notification.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      // Filter by read status
      if (currentFilter === "unread" && notification.isRead) return false;
      if (currentFilter === "starred" && !notification.isStarred) return false;
      if (currentFilter === "archived" && !notification.isArchived) return false;
      
      return true;
    });

    // Sort notifications
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (currentSort) {
        case "time":
          // Simple timestamp comparison (in real app, use actual dates)
          comparison = a.timestamp.localeCompare(b.timestamp);
          break;
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
          break;
        case "type":
          comparison = a.type.localeCompare(b.type);
          break;
        case "status":
          comparison = Number(a.isRead) - Number(b.isRead);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === "desc" ? -comparison : comparison;
    });

    setFilteredNotifications(filtered);
  }, [notifications, currentFilter, searchQuery, currentSort, sortDirection]);

  const filteredNotificationsList = notificationsList.filter(notification => {
    if (selectedFilter === "all") return true;
    return notification.type === selectedFilter;
  });

  const unreadCount = notificationsList.filter(n => !n.isRead).length;

  // Get navigation items based on user type
  const getNavigationItems = () => {
    switch (userType) {
      case 'Super Admin':
        return [
          { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, onClick: () => navigate("/super-admin") },
          { name: "Admin Users", icon: <ShieldIcon className="w-5 h-5" />, onClick: () => navigate("/super-admin") },
          { name: "User Management", icon: <UsersIcon className="w-5 h-5" />, onClick: () => navigate("/super-admin") },
          { name: "System Health", icon: <ActivityIcon className="w-5 h-5" />, onClick: () => navigate("/super-admin") },
          { name: "Notifications", icon: <BellIcon className="w-5 h-5" />, active: true, onClick: () => navigate("/notifications") }
        ];
      
      case 'Admin':
        return [
          { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, onClick: () => navigate("/admin") },
          { name: "User Management", icon: <UsersIcon className="w-5 h-5" />, onClick: () => navigate("/admin") },
          { name: "Transactions", icon: <CreditCardIcon className="w-5 h-5" />, onClick: () => navigate("/admin") },
          { name: "Reports", icon: <BarChart3Icon className="w-5 h-5" />, onClick: () => navigate("/admin") },
          { name: "Notifications", icon: <BellIcon className="w-5 h-5" />, active: true, onClick: () => navigate("/notifications") }
        ];
      
      case 'Customer Support':
        return [
          { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, onClick: () => navigate("/support") },
          { name: "Tickets", icon: <TicketIcon className="w-5 h-5" />, onClick: () => navigate("/support") },
          { name: "Live Chat", icon: <MessageSquareIcon className="w-5 h-5" />, onClick: () => navigate("/support") },
          { name: "Knowledge Base", icon: <FileTextIcon className="w-5 h-5" />, onClick: () => navigate("/support") },
          { name: "Notifications", icon: <BellIcon className="w-5 h-5" />, active: true, onClick: () => navigate("/notifications") }
        ];
      
      case 'Developer Account':
        return [
          { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, onClick: () => navigate("/developer-dashboard") },
          { name: "API Keys", icon: <KeyIcon className="w-5 h-5" />, onClick: () => navigate("/developer-dashboard") },
          { name: "Sandbox", icon: <ServerIcon className="w-5 h-5" />, onClick: () => navigate("/developer-dashboard") },
          { name: "Documentation", icon: <FileTextIcon className="w-5 h-5" />, onClick: () => navigate("/developer-dashboard") },
          { name: "Notifications", icon: <BellIcon className="w-5 h-5" />, active: true, onClick: () => navigate("/notifications") }
        ];
      
      case 'Customer (Business Account)':
        return [
          { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, onClick: () => navigate("/business-dashboard") },
          { name: "Payroll", icon: <UsersIcon className="w-5 h-5" />, onClick: () => navigate("/payroll") },
          { name: "Bulk Transfer", icon: <FileTextIcon className="w-5 h-5" />, onClick: () => navigate("/bulk-transfer") },
          { name: "Reports", icon: <BarChart3Icon className="w-5 h-5" />, onClick: () => navigate("/reports") },
          { name: "Notifications", icon: <BellIcon className="w-5 h-5" />, active: true, onClick: () => navigate("/notifications") }
        ];
      
      default: // Individual Customer
        return [
    { 
      name: "Dashboard", 
      icon: <HomeIcon className="w-5 h-5" />, 
      active: false,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "Payments", 
      icon: <CreditCardIcon className="w-5 h-5" />, 
      hasDropdown: true,
      onClick: () => navigate("/payments")
    },
    { 
      name: "Transactions", 
      icon: <ReceiptIcon className="w-5 h-5" />,
      onClick: () => navigate("/transactions")
    },
    { 
      name: "Cards", 
      icon: <CreditCardIcon className="w-5 h-5" />,
      onClick: () => navigate("/cards")
    },
    { 
      name: "SureSavings", 
      icon: <PiggyBankIcon className="w-5 h-5" />,
      onClick: () => navigate("/sure-savings")
    },
    { 
      name: "SureBudget", 
      icon: <BarChart3Icon className="w-5 h-5" />,
      onClick: () => navigate("/sure-budget")
    },
    { 
      name: "SureEscrow", 
      icon: <HandshakeIcon className="w-5 h-5" />,
      onClick: () => navigate("/sure-escrow")
    },
    { 
      name: "Inbox", 
      icon: <InboxIcon className="w-5 h-5" />, 
      notifications: 99,
      onClick: () => navigate("/inbox")
    },
    { 
      name: "Notifications", 
      icon: <BellIcon className="w-5 h-5" />,
      active: true,
      onClick: () => navigate("/notifications")
    },
        ];
    }
  };

  const navItems = getNavigationItems();

  // Mobile Navigation Items
  const mobileNavItems = [
    { name: "Home", icon: <HomeIcon className="w-6 h-6" />, onClick: () => navigate("/dashboard") },
    { name: "Notifications", icon: <BellIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/notifications") },
    { name: "Cards", icon: <CreditCardIcon className="w-6 h-6" />, onClick: () => navigate("/cards") },
    { name: "Profile", icon: <UserIcon className="w-6 h-6" />, onClick: () => navigate("/profile") }
  ];

  // Utility functions
  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    if (notification.actionable && notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  const markAsUnread = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: false } : n)
    );
  };

  const toggleStar = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isStarred: !n.isStarred } : n)
    );
  };

  const archiveNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isArchived: true } : n)
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // In real app, fetch new notifications from API
    }, 1000);
  };

  const toggleExpanded = (notificationId: string) => {
    setExpandedNotifications(prev => 
      prev.includes(notificationId) 
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case "read":
        setNotifications(prev => 
          prev.map(n => selectedNotifications.includes(n.id) ? { ...n, isRead: true } : n)
        );
        break;
      case "unread":
        setNotifications(prev => 
          prev.map(n => selectedNotifications.includes(n.id) ? { ...n, isRead: false } : n)
        );
        break;
      case "star":
        setNotifications(prev => 
          prev.map(n => selectedNotifications.includes(n.id) ? { ...n, isStarred: true } : n)
        );
        break;
      case "archive":
        setNotifications(prev => 
          prev.map(n => selectedNotifications.includes(n.id) ? { ...n, isArchived: true } : n)
        );
        break;
      case "delete":
        setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)));
        break;
    }
    setSelectedNotifications([]);
  };

  const selectNotification = (notificationId: string) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId) 
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const selectAllNotifications = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "border-l-red-500 bg-red-50";
      case "high": return "border-l-orange-500 bg-orange-50";
      case "medium": return "border-l-blue-500 bg-blue-50";
      case "low": return "border-l-gray-500 bg-gray-50";
      default: return "border-l-gray-300 bg-white";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "kyc": return "bg-blue-100 text-blue-800";
      case "kyb": return "bg-purple-100 text-purple-800";
      case "payroll": return "bg-green-100 text-green-800";
      case "approval": return "bg-orange-100 text-orange-800";
      case "loan": return "bg-indigo-100 text-indigo-800";
      case "savings": return "bg-teal-100 text-teal-800";
      case "api": return "bg-blue-100 text-blue-800";
      case "sandbox": return "bg-purple-100 text-purple-800";
      case "webhook": return "bg-red-100 text-red-800";
      case "documentation": return "bg-green-100 text-green-800";
      case "ticket": return "bg-orange-100 text-orange-800";
      case "chat": return "bg-blue-100 text-blue-800";
      case "escalation": return "bg-yellow-100 text-yellow-800";
      case "achievement": return "bg-green-100 text-green-800";
      case "admin": return "bg-purple-100 text-purple-800";
      case "maintenance": return "bg-blue-100 text-blue-800";
      case "user": return "bg-orange-100 text-orange-800";
      case "report": return "bg-indigo-100 text-indigo-800";
      case "transaction": return "bg-blue-100 text-blue-800";
      case "security": return "bg-red-100 text-red-800";
      case "promotion": return "bg-purple-100 text-purple-800";
      case "notification": return "bg-orange-100 text-orange-800";
      case "system": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    // In real app, use proper date formatting
    return timestamp;
  };

  // Get page title based on user type
  const getPageTitle = () => {
    switch (userType) {
      case 'Super Admin': return "Super Admin Notifications";
      case 'Admin': return "Admin Notifications";
      case 'Customer Support': return "Support Notifications";
      case 'Developer Account': return "Developer Notifications";
      case 'Customer (Business Account)': return "Business Notifications";
      default: return "Notifications";
    }
  };

  // Get back navigation based on user type
  const getBackNavigation = () => {
    switch (userType) {
      case 'Super Admin': return "/super-admin";
      case 'Admin': return "/admin";
      case 'Customer Support': return "/support";
      case 'Developer Account': return "/developer-dashboard";
      case 'Customer (Business Account)': return "/business-dashboard";
      default: return "/dashboard";
    }
  };

  // Notification Settings Component
  const NotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1E293B]">Notification Settings</h3>
        <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
          <XIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Delivery Methods */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h4 className="font-semibold text-[#1E293B] mb-4">Delivery Methods</h4>
          <div className="space-y-4">
            {[
              { key: "emailNotifications", label: "Email Notifications", icon: <MailIcon className="w-5 h-5" /> },
              { key: "pushNotifications", label: "Push Notifications", icon: <BellIcon className="w-5 h-5" /> },
              { key: "smsNotifications", label: "SMS Notifications", icon: <SmartphoneIcon className="w-5 h-5" /> },
              { key: "inAppNotifications", label: "In-App Notifications", icon: <BellRingIcon className="w-5 h-5" /> }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-[#64748B]">{setting.icon}</div>
                  <span className="font-medium text-[#1E293B]">{setting.label}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings[setting.key as keyof typeof notificationSettings] as boolean}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      [setting.key]: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B52FF]"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sound & Vibration */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h4 className="font-semibold text-[#1E293B] mb-4">Sound & Vibration</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2Icon className="w-5 h-5 text-[#64748B]" />
                <span className="font-medium text-[#1E293B]">Sound Enabled</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.soundEnabled}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    soundEnabled: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B52FF]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <VibrateIcon className="w-5 h-5 text-[#64748B]" />
                <span className="font-medium text-[#1E293B]">Vibration Enabled</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.vibrationEnabled}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    vibrationEnabled: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B52FF]"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h4 className="font-semibold text-[#1E293B] mb-4">Notification Categories</h4>
          <div className="space-y-4">
            {Object.entries(notificationSettings.categories).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="font-medium text-[#1E293B] capitalize">{key}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      categories: {
                        ...notificationSettings.categories,
                        [key]: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B52FF]"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Frequency */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h4 className="font-semibold text-[#1E293B] mb-4">Notification Frequency</h4>
          <select 
            value={notificationSettings.frequency}
            onChange={(e) => setNotificationSettings({
              ...notificationSettings,
              frequency: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="immediate">Immediate</option>
            <option value="hourly">Hourly Digest</option>
            <option value="daily">Daily Digest</option>
            <option value="weekly">Weekly Digest</option>
          </select>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h4 className="font-semibold text-[#1E293B] mb-4">Quiet Hours</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#1E293B]">Enable Quiet Hours</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.quietHours.enabled}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    quietHours: {
                      ...notificationSettings.quietHours,
                      enabled: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B52FF]"></div>
              </label>
            </div>
            {notificationSettings.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Start Time</label>
                  <Input
                    type="time"
                    value={notificationSettings.quietHours.start}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      quietHours: {
                        ...notificationSettings.quietHours,
                        start: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">End Time</label>
                  <Input
                    type="time"
                    value={notificationSettings.quietHours.end}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      quietHours: {
                        ...notificationSettings.quietHours,
                        end: e.target.value
                      }
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
        <div className={`w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 ${
          userType === 'Super Admin' ? 'bg-gradient-to-b from-purple-50 to-white' : ''
        }`}>
          <div className="p-6 border-b border-gray-200">
            {userType === 'Super Admin' ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <CrownIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-[#1E293B]">Super Admin</h1>
                  <p className="text-xs text-[#64748B]">Platform Control</p>
                </div>
              </div>
            ) : (
              <img 
                src="/Logo Main Trans.png" 
                alt="SureBanker" 
                className="h-8 w-auto object-contain"
              />
            )}
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                    item.active ? 'bg-[#5B52FF] text-white' : 'text-[#64748B] hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDownIcon className="w-4 h-4 ml-auto" />
                  )}
                  {item.notifications && (
                    <Badge className="ml-auto bg-red-500 text-white text-xs">
                      {item.notifications}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </nav>

          <div className="p-4">
            <Card className="bg-[#1E293B] text-white card-no-shadow">
              <CardContent className="p-4">
                <p className="text-sm text-gray-300 mb-3">
                  Gain full access to rewards and bonuses when you get your friends to use{" "}
                  <span className="font-bold">SureBanker</span>
                </p>
                <Button className="w-full bg-[#5B52FF] hover:bg-[#4338CA] text-white btn-primary">
                  Refer & Earn
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate(getBackNavigation())}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className={`text-xl font-semibold text-[#1E293B] flex items-center gap-2 ${
                    userType === 'Super Admin' ? 'text-purple-700' : ''
                  }`}>
                    <BellIcon className="w-6 h-6 text-[#5B52FF]" />
                    {getPageTitle()}
                  </h1>
                  <p className="text-sm text-[#64748B]">
                    {stats.unread} unread • {stats.total} total
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-2"
                >
                  <RefreshCwIcon className={`w-5 h-5 text-[#64748B] ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2"
                >
                  <SettingsIcon className="w-5 h-5 text-[#64748B]" />
                </Button>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">
                      {demoUser.name || currentAccount?.name || 'User'}
                    </div>
                    <div className="text-xs text-[#64748B]">{userType}</div>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={`${
                      userType === 'Super Admin' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-[#5B52FF]'
                    } text-white`}>
                      {userType === 'Super Admin' ? 'SA' : 
                       userType === 'Admin' ? 'AD' :
                       userType === 'Customer Support' ? 'CS' :
                       userType === 'Developer Account' ? 'DV' :
                       userType === 'Customer (Business Account)' ? 'BA' :
                       currentAccount?.avatar || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {showSettings ? (
              <NotificationSettings />
            ) : (
              <div className="space-y-6">
                {/* Statistics Dashboard */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="card-no-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BellIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-[#64748B]">Total</p>
                          <p className="text-xl font-bold text-[#1E293B]">{stats.total}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-no-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <BellRingIcon className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-[#64748B]">Unread</p>
                          <p className="text-xl font-bold text-red-600">{stats.unread}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-no-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <StarIcon className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-[#64748B]">Starred</p>
                          <p className="text-xl font-bold text-yellow-600">{stats.starred}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-no-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <AlertTriangleIcon className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-[#64748B]">Urgent</p>
                          <p className="text-xl font-bold text-orange-600">{stats.urgent}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Controls */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                  {/* Search and Filters */}
                  <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                      <Input
                        placeholder="Search notifications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    
                    <select 
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={currentFilter}
                      onChange={(e) => setCurrentFilter(e.target.value)}
                    >
                      <option value="all">All Notifications</option>
                      <option value="unread">Unread</option>
                      <option value="starred">Starred</option>
                      <option value="transaction">Transactions</option>
                      <option value="security">Security</option>
                      <option value="savings">Savings</option>
                      <option value="promotional">Promotions</option>
                      <option value="system">System</option>
                      <option value="social">Social</option>
                      <option value="card">Cards</option>
                      <option value="bill">Bills</option>
                      <option value="achievement">Achievements</option>
                    </select>

                    <div className="flex items-center gap-2">
                      <select 
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        value={currentSort}
                        onChange={(e) => setCurrentSort(e.target.value)}
                      >
                        <option value="time">Sort by Time</option>
                        <option value="priority">Sort by Priority</option>
                        <option value="type">Sort by Type</option>
                        <option value="status">Sort by Status</option>
                      </select>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortDirection(prev => prev === "asc" ? "desc" : "asc")}
                      >
                        {sortDirection === "desc" ? <SortDescIcon className="w-4 h-4" /> : <SortAscIcon className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* View Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-r-none"
                      >
                        <ListIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-none border-x"
                      >
                        <GridIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === "compact" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("compact")}
                        className="rounded-l-none"
                      >
                        <Minimize2Icon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bulk Actions */}
                {selectedNotifications.length > 0 && (
                  <Card className="bg-[#F8F9FF] border-[#5B52FF] card-no-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-[#1E293B]">
                            {selectedNotifications.length} notification(s) selected
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleBulkAction("read")}>
                            Mark Read
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleBulkAction("star")}>
                            Star
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleBulkAction("archive")}>
                            Archive
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleBulkAction("delete")}>
                            Delete
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setSelectedNotifications([])}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    <CheckIcon className="w-4 h-4 mr-2" />
                    Mark All Read
                  </Button>
                  <Button variant="outline" size="sm" onClick={selectAllNotifications}>
                    <CheckIcon className="w-4 h-4 mr-2" />
                    {selectedNotifications.length === filteredNotifications.length ? 'Deselect All' : 'Select All'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                    <FilterIcon className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearAllNotifications}>
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>

                {/* Notifications List */}
                <div className={`${
                  viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-4" :
                  viewMode === "compact" ? "space-y-2" :
                  "space-y-4"
                }`}>
                  {filteredNotifications.map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`cursor-pointer hover:shadow-md transition-all border-l-4 ${getPriorityColor(notification.priority)} ${
                        !notification.isRead ? 'ring-1 ring-blue-200' : ''
                      } ${selectedNotifications.includes(notification.id) ? 'ring-2 ring-[#5B52FF]' : ''} card-no-shadow`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <CardContent className={`${viewMode === "compact" ? "p-3" : "p-4"}`}>
                        <div className="flex items-start gap-3">
                          {/* Selection Checkbox */}
                          <input
                            type="checkbox"
                            checked={selectedNotifications.includes(notification.id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              selectNotification(notification.id);
                            }}
                            className="mt-1"
                          />

                          {/* Notification Icon */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            notification.type === 'transaction' ? 'bg-green-100' :
                            notification.type === 'security' ? 'bg-red-100' :
                            notification.type === 'savings' ? 'bg-purple-100' :
                            notification.type === 'promotional' ? 'bg-orange-100' :
                            notification.type === 'system' ? 'bg-blue-100' :
                            notification.type === 'social' ? 'bg-indigo-100' :
                            notification.type === 'card' ? 'bg-cyan-100' :
                            notification.type === 'bill' ? 'bg-teal-100' :
                            notification.type === 'achievement' ? 'bg-yellow-100' :
                            'bg-gray-100'
                          } ${notification.priority === 'urgent' ? 'animate-pulse' : ''}`}>
                            <div className={notification.color}>
                              {notification.icon}
                            </div>
                          </div>
                          
                          {/* Notification Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className={`font-semibold text-[#1E293B] ${!notification.isRead ? 'font-bold' : ''}`}>
                                  {notification.title}
                                </h3>
                                <Badge className={`text-xs ${getTypeColor(notification.type)}`}>
                                  {notification.type}
                                </Badge>
                                {notification.priority === 'urgent' && (
                                  <Badge className="bg-red-100 text-red-800 text-xs animate-pulse">
                                    URGENT
                                  </Badge>
                                )}
                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleStar(notification.id);
                                  }}
                                  className="p-1"
                                >
                                  <StarIcon className={`w-4 h-4 ${notification.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpanded(notification.id);
                                  }}
                                  className="p-1"
                                >
                                  <MoreHorizontalIcon className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <p className={`text-[#64748B] text-sm mb-3 ${!notification.isRead ? 'font-medium' : ''} ${
                              viewMode === "compact" ? "line-clamp-1" : "line-clamp-2"
                            }`}>
                              {notification.message}
                            </p>

                            {/* Metadata */}
                            {notification.metadata && viewMode !== "compact" && (
                              <div className="flex flex-wrap gap-3 text-xs text-[#64748B] mb-3">
                                {notification.metadata.amount && (
                                  <span className="flex items-center gap-1">
                                    <DollarSignIcon className="w-3 h-3" />
                                    {notification.metadata.amount}
                                  </span>
                                )}
                                {notification.metadata.transactionId && (
                                  <span className="flex items-center gap-1">
                                    <ReceiptIcon className="w-3 h-3" />
                                    {notification.metadata.transactionId}
                                  </span>
                                )}
                                {notification.metadata.location && (
                                  <span className="flex items-center gap-1">
                                    <MapIcon className="w-3 h-3" />
                                    {notification.metadata.location}
                                  </span>
                                )}
                                {notification.metadata.device && (
                                  <span className="flex items-center gap-1">
                                    <SmartphoneIcon className="w-3 h-3" />
                                    {notification.metadata.device}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Expanded Content */}
                            {expandedNotifications.includes(notification.id) && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-[#64748B]">Notification ID:</span>
                                    <span className="font-mono text-[#1E293B]">{notification.id}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-[#64748B]">Priority:</span>
                                    <Badge className={
                                      notification.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                      notification.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                      notification.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                                      'bg-gray-100 text-gray-800'
                                    }>
                                      {notification.priority}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-[#64748B]">Status:</span>
                                    <span className={notification.isRead ? 'text-gray-600' : 'text-blue-600 font-medium'}>
                                      {notification.isRead ? 'Read' : 'Unread'}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex gap-2 mt-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      notification.isRead ? markAsUnread(notification.id) : markAsRead(notification.id);
                                    }}
                                  >
                                    {notification.isRead ? <MarkAsUnreadIcon className="w-3 h-3 mr-1" /> : <EyeIcon className="w-3 h-3 mr-1" />}
                                    {notification.isRead ? 'Mark Unread' : 'Mark Read'}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      archiveNotification(notification.id);
                                    }}
                                  >
                                    <ArchiveIcon className="w-3 h-3 mr-1" />
                                    Archive
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteNotification(notification.id);
                                    }}
                                  >
                                    <TrashIcon className="w-3 h-3 mr-1" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-[#64748B]">
                                <ClockIcon className="w-3 h-3" />
                                <span>{formatTimestamp(notification.timestamp)}</span>
                              </div>
                              
                              {notification.actionable && (
                                <Button
                                  size="sm"
                                  className="bg-[#5B52FF] text-white btn-primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (notification.actionUrl) {
                                      navigate(notification.actionUrl);
                                    }
                                  }}
                                >
                                  {notification.actionText || 'View'}
                                  <ExternalLinkIcon className="w-3 h-3 ml-1" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Empty State */}
                {filteredNotifications.length === 0 && (
                  <div className="text-center py-12">
                    <BellOffIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[#1E293B] mb-2">No notifications found</h3>
                    <p className="text-[#64748B]">
                      {searchQuery || currentFilter !== "all" 
                        ? "Try adjusting your search or filter criteria" 
                        : "You're all caught up! No new notifications."}
                    </p>
                  </div>
                )}

                {/* Load More */}
                {filteredNotifications.length > 0 && (
                  <div className="text-center">
                    <Button variant="outline" className="px-8">
                      Load More Notifications
                    </Button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(getBackNavigation())}>
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">{getPageTitle()}</h1>
              <p className="text-xs text-[#64748B]">{unreadCount} unread</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCwIcon className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowSettings(!showSettings)}
            >
              <SettingsIcon className="w-4 h-4" />
            </Button>
          </div>
        </header>

        <main className="p-4 pb-20">
          {showSettings ? (
            <NotificationSettings />
          ) : (
            <div className="space-y-4">
              {/* Mobile Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="card-no-shadow">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-[#1E293B]">{notificationsList.length}</p>
                    <p className="text-sm text-[#64748B]">Total</p>
                  </CardContent>
                </Card>
                <Card className="card-no-shadow">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
                    <p className="text-sm text-[#64748B]">Unread</p>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Search */}
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Mobile Filter Buttons */}
              <div className="flex gap-2 overflow-x-auto">
                <Button 
                  variant={selectedFilter === "all" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedFilter("all")}
                  className={selectedFilter === "all" ? "bg-[#5B52FF] text-white" : ""}
                >
                  All
                </Button>
                {/* Dynamic filter buttons based on user type */}
                {userType === 'Super Admin' && (
                  <>
                    <Button 
                      variant={selectedFilter === "system" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("system")}
                      className={selectedFilter === "system" ? "bg-[#5B52FF] text-white" : "bg-white"}
                    >
                      System
                    </Button>
                    <Button 
                      variant={selectedFilter === "security" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("security")}
                      className={selectedFilter === "security" ? "bg-[#5B52FF] text-white" : "bg-white"}
                    >
                      Security
                    </Button>
                    <Button 
                      variant={selectedFilter === "admin" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("admin")}
                      className={selectedFilter === "admin" ? "bg-[#5B52FF] text-white" : "bg-white"}
                    >
                      Admin
                    </Button>
                  </>
                )}
                {userType === 'Customer Support' && (
                  <>
                    <Button 
                      variant={selectedFilter === "ticket" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("ticket")}
                      className={selectedFilter === "ticket" ? "bg-[#5B52FF] text-white" : "bg-white"}
                    >
                      Tickets
                    </Button>
                    <Button 
                      variant={selectedFilter === "chat" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("chat")}
                      className={selectedFilter === "chat" ? "bg-[#5B52FF] text-white" : "bg-white"}
                    >
                      Chat
                    </Button>
                  </>
                )}
                {userType === 'Developer Account' && (
                  <>
                    <Button 
                      variant={selectedFilter === "api" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("api")}
                      className={selectedFilter === "api" ? "bg-[#5B52FF] text-white" : "bg-white"}
                    >
                      API
                    </Button>
                    <Button 
                      variant={selectedFilter === "sandbox" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("sandbox")}
                      className={selectedFilter === "sandbox" ? "bg-[#5B52FF] text-white" : "bg-white"}
                    >
                      Sandbox
                    </Button>
                  </>
                )}
                {(userType === 'Customer (Business Account)' || userType === 'Admin') && (
                  <>
                    <Button 
                      variant={selectedFilter === "transaction" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("transaction")}
                      className={selectedFilter === "transaction" ? "bg-[#5B52FF] text-white" : "bg-white"}
                    >
                      Transactions
                    </Button>
                    <Button 
                      variant={selectedFilter === "security" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("security")}
                      className={selectedFilter === "security" ? "bg-[#5B52FF] text-white" : "bg-white"}
                    >
                      Security
                    </Button>
                  </>
                )}
                {userType === 'Customer (Individual Account)' && (
                  <>
                    <Button 
                      variant={selectedFilter === "transaction" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("transaction")}
                      className={selectedFilter === "transaction" ? "bg-[#5B52FF] text-white" : "bg-white"}
                    >
                      Transactions
                    </Button>
                    <Button 
                      variant={selectedFilter === "promotion" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("promotion")}
                      className={selectedFilter === "promotion" ? "bg-[#5B52FF] text-white" : "bg-white"}
                    >
                      Promos
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Quick Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={markAllAsRead} className="flex-1">
                  Mark All Read
                </Button>
                <Button variant="outline" size="sm" onClick={selectAllNotifications} className="flex-1">
                  Select All
                </Button>
              </div>

              {/* Mobile Notifications */}
              <div className="space-y-3">
                {filteredNotificationsList.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`border-l-4 ${getPriorityColor(notification.priority)} ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    } card-no-shadow`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.type === 'transaction' ? 'bg-green-100' :
                          notification.type === 'security' ? 'bg-red-100' :
                          notification.type === 'savings' ? 'bg-purple-100' :
                          notification.type === 'promotional' ? 'bg-orange-100' :
                          notification.type === 'system' ? 'bg-blue-100' :
                          notification.type === 'social' ? 'bg-indigo-100' :
                          notification.type === 'card' ? 'bg-cyan-100' :
                          notification.type === 'bill' ? 'bg-teal-100' :
                          notification.type === 'achievement' ? 'bg-yellow-100' :
                          'bg-gray-100'
                        }`}>
                          <div className={notification.color}>
                            {notification.icon}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold text-[#1E293B] text-sm ${!notification.isRead ? 'font-bold' : ''}`}>
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            {notification.isStarred && (
                              <StarIcon className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            )}
                          </div>
                          <p className={`text-[#64748B] text-sm mb-2 line-clamp-2 ${!notification.isRead ? 'font-medium' : ''}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-[#64748B]">{notification.timestamp}</p>
                              <Badge className={`text-xs ${getTypeColor(notification.type)}`}>
                                {notification.type}
                              </Badge>
                            </div>
                            {notification.actionable && (
                              <Button
                                size="sm"
                                className="bg-[#5B52FF] text-white text-xs px-2 py-1 h-6"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (notification.actionUrl) {
                                    navigate(notification.actionUrl);
                                  }
                                }}
                              >
                                {notification.actionText || 'View'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Mobile Empty State */}
              {filteredNotificationsList.length === 0 && (
                <div className="text-center py-8">
                  <BellOffIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-2">No notifications</h3>
                  <p className="text-[#64748B] text-sm">You're all caught up!</p>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {mobileNavItems.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center py-2 cursor-pointer"
                onClick={item.onClick}
              >
                <div className={`${item.active ? 'text-[#5B52FF]' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 ${item.active ? 'text-[#5B52FF] font-medium' : 'text-gray-400'}`}>
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