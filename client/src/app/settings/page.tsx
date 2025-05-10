/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Bell,
  Check,
  ChevronRight,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  FileText,
  HardDrive,
  Hexagon,
  Info,
  Key,
  Laptop,
  Lock,
  type LucideIcon,
  Network,
  Palette,
  QrCode,
  Save,
  Search,
  SettingsIcon,
  Shield,
  Smartphone,
  Sun,
  Moon,
  Trash,
  Upload,
  User,
  UserPlus,
  Wallet,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth-provider";

interface SettingsSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
}

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-xl border border-blue-800/30 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20">
            <Icon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-blue-200/70">{description}</p>
          </div>
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </motion.div>
  );
}

function SettingItem({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg p-4 transition-colors hover:bg-blue-900/10">
      <div className="space-y-0.5">
        <Label className="text-base text-white">{title}</Label>
        {description && (
          <p className="text-sm text-blue-200/70">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const user = {
    id: "user_" + Math.random().toString(36).substring(2, 9),
    name: "user",
    email: "user@mail.com",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user@mail.com`,
    walletAddress: "0x8f72...e492",
    role: "user",
  };
  //   const {user} = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("account");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [securityScore, setSecurityScore] = useState(75);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] =
    useState(false);
  const [qrCodeDialogOpen, setQrCodeDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isAddAddressDialogOpen, setIsAddAddressDialogOpen] = useState(false);
  const [isAddNetworkDialogOpen, setIsAddNetworkDialogOpen] = useState(false);
  const [isAddHardwareWalletDialogOpen, setIsAddHardwareWalletDialogOpen] =
    useState(false);
  const [isMfaSetupDialogOpen, setIsMfaSetupDialogOpen] = useState(false);
  const [mfaVerificationCode, setMfaVerificationCode] = useState("");
  const [mfaStep, setMfaStep] = useState(1);
  const [filteredSettings, setFilteredSettings] = useState<string[]>([]);

  // Simulate loading user preferences
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    securityAlerts: true,
    twoFactorAuth: false,
    mfaMethod: "none",
    biometricLogin: false,
    autoLock: true,
    autoLockTime: 5,
    defaultGasFee: "medium",
    defaultCurrency: "USD",
    language: "en",
    theme: "dark",
    showBalances: true,
    transactionConfirmation: true,
    highValueConfirmation: true,
    highValueThreshold: 1000,
    apiAccess: false,
    dataSharing: false,
    sessionTimeout: 30,
    colorMode: "system",
    soundEffects: true,
    hapticFeedback: true,
    compactMode: false,
    advancedMode: false,
    developerMode: false,
  });

  // Connected devices
  const [connectedDevices, setConnectedDevices] = useState([
    {
      id: 1,
      name: "Chrome on MacBook Pro",
      type: "browser",
      lastActive: "Active now",
      icon: Laptop,
    },
    {
      id: 2,
      name: "iPhone 13 Pro",
      type: "mobile",
      lastActive: "2 hours ago",
      icon: Smartphone,
    },
    {
      id: 3,
      name: "Firefox on Windows",
      type: "browser",
      lastActive: "Yesterday",
      icon: Laptop,
    },
  ]);

  // Connected wallets
  const [connectedWallets, setConnectedWallets] = useState([
    {
      id: 1,
      name: "MetaMask",
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      isDefault: true,
      icon: "/placeholder.svg?height=32&width=32",
      type: "software",
    },
    {
      id: 2,
      name: "Coinbase Wallet",
      address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
      isDefault: false,
      icon: "/placeholder.svg?height=32&width=32",
      type: "software",
    },
  ]);

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Credit Card",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "Bank Account",
      last4: "1234",
      name: "Chase Checking",
      isDefault: false,
    },
  ]);

  // Custom networks
  const [networks, setNetworks] = useState([
    {
      id: 1,
      name: "Ethereum Mainnet",
      url: "https://mainnet.infura.io/v3/your-api-key",
      chainId: 1,
      currency: "ETH",
      isDefault: true,
    },
    {
      id: 2,
      name: "Binance Smart Chain",
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      currency: "BNB",
      isDefault: false,
    },
    {
      id: 3,
      name: "Polygon Mainnet",
      url: "https://polygon-rpc.com",
      chainId: 137,
      currency: "MATIC",
      isDefault: false,
    },
  ]);

  // Address book
  const [addressBook, setAddressBook] = useState([
    {
      id: 1,
      name: "My Savings",
      address: "0x1234567890abcdef1234567890abcdef12345678",
      notes: "Cold storage wallet",
    },
    {
      id: 2,
      name: "Exchange Account",
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
      notes: "Binance deposit address",
    },
    {
      id: 3,
      name: "Friend - Alex",
      address: "0x7890abcdef1234567890abcdef1234567890abcd",
      notes: "For splitting bills",
    },
  ]);

  // Hardware wallets
  const [hardwareWallets, setHardwareWallets] = useState([
    {
      id: 1,
      name: "Ledger Nano X",
      model: "Nano X",
      lastUsed: "2 days ago",
      status: "connected",
    },
  ]);

  // New address form state
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    notes: "",
  });

  // New network form state
  const [newNetwork, setNewNetwork] = useState({
    name: "",
    url: "",
    chainId: "",
    currency: "",
  });

  // New hardware wallet state
  const [newHardwareWallet, setNewHardwareWallet] = useState({
    name: "",
    model: "",
  });

  // Search filter functionality
  useEffect(() => {
    if (!searchQuery) {
      setFilteredSettings([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: string[] = [];

    const settingsMap = {
      account: [
        "profile",
        "name",
        "email",
        "bio",
        "language",
        "currency",
        "delete account",
      ],
      security: [
        "password",
        "two-factor",
        "2fa",
        "authentication",
        "biometric",
        "auto-lock",
        "security score",
      ],
      wallets: [
        "wallet",
        "metamask",
        "coinbase",
        "transaction",
        "gas fee",
        "default wallet",
      ],
      payments: [
        "payment",
        "credit card",
        "bank account",
        "billing",
        "subscription",
      ],
      notifications: [
        "notification",
        "email",
        "push",
        "sms",
        "alerts",
        "marketing",
      ],
      appearance: [
        "theme",
        "dark",
        "light",
        "color",
        "sound",
        "animation",
        "accessibility",
      ],
      privacy: [
        "privacy",
        "data",
        "cookie",
        "session",
        "export data",
        "delete data",
      ],
      advanced: [
        "developer",
        "api",
        "webhook",
        "backup",
        "seed phrase",
        "private key",
        "system",
      ],
      network: [
        "network",
        "ethereum",
        "binance",
        "polygon",
        "chain id",
        "rpc url",
      ],
      address: ["address book", "contact", "recipient", "save address"],
      hardware: ["hardware wallet", "ledger", "trezor", "cold storage"],
      mfa: ["multi-factor", "authenticator", "security key", "backup codes"],
    };

    for (const [tab, keywords] of Object.entries(settingsMap)) {
      if (keywords.some((keyword) => keyword.includes(query))) {
        results.push(tab);
      }
    }

    setFilteredSettings(results);
  }, [searchQuery]);

  // Effect to update security score based on settings
  useEffect(() => {
    let score = 50; // Base score

    if (preferences.twoFactorAuth) score += 15;
    if (preferences.mfaMethod !== "none") score += 10;
    if (preferences.biometricLogin) score += 5;
    if (preferences.autoLock) score += 5;
    if (preferences.autoLockTime < 10) score += 5;
    if (preferences.transactionConfirmation) score += 5;
    if (preferences.highValueConfirmation) score += 5;
    if (hardwareWallets.length > 0) score += 10;

    // Cap at 100
    setSecurityScore(Math.min(score, 100));
  }, [preferences, hardwareWallets]);

  // Handle form changes
  const handlePreferenceChange = (
    key: string,
    value: boolean | string | number
  ) => {
    setPreferences({
      ...preferences,
      [key]: value,
    });
    setHasUnsavedChanges(true);
  };

  // Save changes
  const saveChanges = () => {
    // Simulate API call
    setTimeout(() => {
      setHasUnsavedChanges(false);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }, 800);
  };

  // Export settings
  const exportSettings = () => {
    const settings = {
      preferences,
      connectedWallets,
      networks,
      addressBook,
    };

    const settingsString = JSON.stringify(settings, null, 2);
    const blob = new Blob([settingsString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cryptoflow-settings.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setIsExportDialogOpen(false);
  };

  // Import settings
  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedSettings = JSON.parse(content);

        if (parsedSettings.preferences) {
          setPreferences(parsedSettings.preferences);
        }

        if (parsedSettings.connectedWallets) {
          setConnectedWallets(parsedSettings.connectedWallets);
        }

        if (parsedSettings.networks) {
          setNetworks(parsedSettings.networks);
        }

        if (parsedSettings.addressBook) {
          setAddressBook(parsedSettings.addressBook);
        }

        setHasUnsavedChanges(true);
        setIsImportDialogOpen(false);
      } catch (error) {
        console.error("Failed to import settings:", error);
        // Handle error
      }
    };
    reader.readAsText(file);
  };

  // Add network
  const addNetwork = () => {
    if (
      !newNetwork.name ||
      !newNetwork.url ||
      !newNetwork.chainId ||
      !newNetwork.currency
    ) {
      return;
    }

    setNetworks([
      ...networks,
      {
        id: networks.length + 1,
        name: newNetwork.name,
        url: newNetwork.url,
        chainId: Number.parseInt(newNetwork.chainId),
        currency: newNetwork.currency,
        isDefault: false,
      },
    ]);

    setNewNetwork({ name: "", url: "", chainId: "", currency: "" });
    setIsAddNetworkDialogOpen(false);
    setHasUnsavedChanges(true);
  };

  // Set default network
  const setDefaultNetwork = (id: number) => {
    setNetworks(
      networks.map((network) => ({
        ...network,
        isDefault: network.id === id,
      }))
    );
    setHasUnsavedChanges(true);
  };

  // Remove network
  const removeNetwork = (id: number) => {
    setNetworks(networks.filter((network) => network.id !== id));
    setHasUnsavedChanges(true);
  };

  // Add address
  const addAddress = () => {
    if (!newAddress.name || !newAddress.address) {
      return;
    }

    setAddressBook([
      ...addressBook,
      {
        id: addressBook.length + 1,
        name: newAddress.name,
        address: newAddress.address,
        notes: newAddress.notes || "",
      },
    ]);

    setNewAddress({ name: "", address: "", notes: "" });
    setIsAddAddressDialogOpen(false);
    setHasUnsavedChanges(true);
  };

  // Remove address
  const removeAddress = (id: number) => {
    setAddressBook(addressBook.filter((address) => address.id !== id));
    setHasUnsavedChanges(true);
  };

  // Add hardware wallet
  const addHardwareWallet = () => {
    if (!newHardwareWallet.name || !newHardwareWallet.model) {
      return;
    }

    setHardwareWallets([
      ...hardwareWallets,
      {
        id: hardwareWallets.length + 1,
        name: newHardwareWallet.name,
        model: newHardwareWallet.model,
        lastUsed: "Just now",
        status: "connected",
      },
    ]);

    // Also add to connected wallets
    setConnectedWallets([
      ...connectedWallets,
      {
        id: connectedWallets.length + 1,
        name: newHardwareWallet.name,
        address: `0x${Math.random().toString(16).substring(2, 42)}`,
        isDefault: false,
        icon: "/placeholder.svg?height=32&width=32",
        type: "hardware",
      },
    ]);

    setNewHardwareWallet({ name: "", model: "" });
    setIsAddHardwareWalletDialogOpen(false);
    setHasUnsavedChanges(true);
  };

  // Remove hardware wallet
  const removeHardwareWallet = (id: number) => {
    setHardwareWallets(hardwareWallets.filter((wallet) => wallet.id !== id));

    // Also remove from connected wallets
    const hardwareWallet = hardwareWallets.find((wallet) => wallet.id === id);
    if (hardwareWallet) {
      setConnectedWallets(
        connectedWallets.filter(
          (wallet) =>
            wallet.name !== hardwareWallet.name || wallet.type !== "hardware"
        )
      );
    }

    setHasUnsavedChanges(true);
  };

  // Set up MFA (Simulated)
  const setupMfa = () => {
    // In a real app, this would generate actual QR code data and secret key
    if (mfaStep === 1) {
      setMfaStep(2);
    } else if (mfaStep === 2) {
      if (mfaVerificationCode.length === 6) {
        handlePreferenceChange("twoFactorAuth", true);
        handlePreferenceChange("mfaMethod", "authenticator");
        setMfaStep(1);
        setMfaVerificationCode("");
        setIsMfaSetupDialogOpen(false);
      }
    }
  };

  // Remove device
  const removeDevice = (id: number) => {
    setConnectedDevices(connectedDevices.filter((device) => device.id !== id));
  };

  // Set default wallet
  const setDefaultWallet = (id: number) => {
    setConnectedWallets(
      connectedWallets.map((wallet) => ({
        ...wallet,
        isDefault: wallet.id === id,
      }))
    );
    setHasUnsavedChanges(true);
  };

  // Remove wallet
  const removeWallet = (id: number) => {
    setConnectedWallets(connectedWallets.filter((wallet) => wallet.id !== id));
    setHasUnsavedChanges(true);
  };

  // Set default payment method
  const setDefaultPaymentMethod = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    setHasUnsavedChanges(true);
  };

  // Remove payment method
  const removePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    setHasUnsavedChanges(true);
  };

  // Handle tab change with search highlighting
  const handleTabChange = useCallback(
    (value: string) => {
      setActiveTab(value);

      // Clear search if changing tabs manually
      if (!filteredSettings.includes(value)) {
        setSearchQuery("");
      }
    },
    [filteredSettings]
  );

  // Warning before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // If there are search results, highlight the first one
  useEffect(() => {
    if (filteredSettings.length > 0 && !filteredSettings.includes(activeTab)) {
      setActiveTab(filteredSettings[0]);
    }
  }, [filteredSettings, activeTab]);

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-10 pt-28"
    >
      {/* Header */}
      <div className="relative rounded-xl bg-gradient-to-r from-blue-900/80 to-purple-900/80 border border-blue-500/20 p-6 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-purple-200"
              >
                Settings
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-blue-200/70"
              >
                Manage your account preferences and customize your experience
              </motion.p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="Search settings..."
                  className="pl-10 w-full md:w-64 glass border-blue-500/20 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {filteredSettings.length > 0 && searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-1 p-2 glass border border-blue-500/20 rounded-md z-20">
                    <p className="text-xs text-blue-300 mb-2">Results</p>
                    {filteredSettings.map((tab) => (
                      <button
                        key={tab}
                        className="block w-full text-left px-3 py-1.5 rounded hover:bg-blue-800/30 text-blue-200"
                        onClick={() => {
                          setActiveTab(tab);
                          setSearchQuery("");
                        }}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button
                onClick={saveChanges}
                disabled={!hasUnsavedChanges}
                className={cn(
                  "relative overflow-hidden",
                  hasUnsavedChanges
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    : "bg-blue-900/50"
                )}
              >
                {hasUnsavedChanges && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0"
                    initial={{ x: -100 }}
                    animate={{ x: 200 }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "linear",
                    }}
                  />
                )}
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showSuccessAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Alert className="bg-green-900/20 border-green-500/50 text-green-400">
            <Check className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your settings have been saved successfully.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-8"
      >
        <div className="glass rounded-lg border border-blue-800/30 p-1.5 overflow-x-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 bg-transparent w-full">
            {[
              { id: "account", icon: User, label: "Account" },
              { id: "security", icon: Shield, label: "Security" },
              { id: "wallets", icon: Wallet, label: "Wallets" },
              { id: "mfa", icon: Key, label: "MFA" },
              { id: "hardware", icon: HardDrive, label: "Hardware" },
              { id: "network", icon: Network, label: "Networks" },
              { id: "address", icon: UserPlus, label: "Address Book" },
              { id: "payments", icon: CreditCard, label: "Payments" },
              { id: "notifications", icon: Bell, label: "Notifications" },
              { id: "appearance", icon: Palette, label: "Appearance" },
              { id: "privacy", icon: Lock, label: "Privacy" },
              { id: "advanced", icon: SettingsIcon, label: "Advanced" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "rounded-md font-medium",
                  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/40 data-[state=active]:to-purple-600/40",
                  "data-[state=active]:border-blue-500/30 data-[state=active]:text-white",
                  "flex items-center gap-2 transition-all relative",
                  filteredSettings.includes(tab.id) && searchQuery
                    ? "ring-2 ring-blue-500/50 ring-offset-1 ring-offset-blue-900/50"
                    : ""
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden md:inline-block">{tab.label}</span>
                {filteredSettings.includes(tab.id) && searchQuery && (
                  <span className="absolute -right-1 -top-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <SettingsSection
            icon={User}
            title="Profile Information"
            description="Update your personal information and profile picture"
          >
            <div className="flex flex-col md:flex-row gap-6 glass rounded-lg border border-blue-800/30 p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-75 blur-sm group-hover:opacity-100 transition duration-1000"></div>
                  <Avatar className="h-24 w-24 border-2 border-blue-800 relative">
                    <AvatarImage
                      src={user?.avatar || ""}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-800 to-purple-900 text-xl">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 group-hover:animate-shimmer"></span>
                  Change Avatar
                </Button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-blue-200">Full Name</Label>
                    <Input
                      defaultValue={user?.name || "John Doe"}
                      className="glass border-blue-800/50"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-blue-200">Display Name</Label>
                    <Input
                      defaultValue={user?.name?.split(" ")[0] || "John"}
                      className="glass border-blue-800/50"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-blue-200">Email Address</Label>
                    <Input
                      type="email"
                      defaultValue={user?.email || "john.doe@example.com"}
                      className="glass border-blue-800/50"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-blue-200">Phone Number</Label>
                    <Input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="glass border-blue-800/50"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-200">Bio</Label>
                  <textarea
                    rows={3}
                    className="w-full rounded-md glass border-blue-800/50 p-2"
                    defaultValue="Crypto enthusiast and blockchain developer."
                    onChange={() => setHasUnsavedChanges(true)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Account Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-blue-200">Language</Label>
                  <Select
                    defaultValue={preferences.language}
                    onValueChange={(value) =>
                      handlePreferenceChange("language", value)
                    }
                  >
                    <SelectTrigger className="glass border-blue-800/50">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-950 border-blue-800">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-200">Default Currency</Label>
                  <Select
                    defaultValue={preferences.defaultCurrency}
                    onValueChange={(value) =>
                      handlePreferenceChange("defaultCurrency", value)
                    }
                  >
                    <SelectTrigger className="glass border-blue-800/50">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-950 border-blue-800">
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                      <SelectItem value="BTC">BTC (₿)</SelectItem>
                      <SelectItem value="ETH">ETH (Ξ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="bg-blue-800/30 my-4" />

              <div className="space-y-4">
                <SettingItem
                  title="Show Account Balances"
                  description="Show your account balances on the dashboard"
                >
                  <Switch
                    checked={preferences.showBalances}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("showBalances", checked)
                    }
                  />
                </SettingItem>

                <SettingItem
                  title="Compact Mode"
                  description="Use a more compact UI layout"
                >
                  <Switch
                    checked={preferences.compactMode}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("compactMode", checked)
                    }
                  />
                </SettingItem>

                <SettingItem
                  title="Advanced Mode"
                  description="Show advanced features and options"
                >
                  <Switch
                    checked={preferences.advancedMode}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("advancedMode", checked)
                    }
                  />
                </SettingItem>
              </div>
            </div>

            <div className="glass rounded-lg border border-red-800/30 bg-red-950/20 p-6">
              <h3 className="text-lg font-medium text-red-400 mb-4">
                Danger Zone
              </h3>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border border-red-900/50 rounded-lg bg-red-950/20">
                <div>
                  <h3 className="font-medium text-red-400">Delete Account</h3>
                  <p className="text-sm text-red-200/70">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                </div>
                <Dialog
                  open={isDeleteAccountDialogOpen}
                  onOpenChange={setIsDeleteAccountDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="bg-red-900 hover:bg-red-800"
                    >
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass border-red-900/50 bg-red-950/90">
                    <DialogHeader>
                      <DialogTitle className="text-red-400">
                        Delete Account
                      </DialogTitle>
                      <DialogDescription className="text-red-200/70">
                        This action cannot be undone. This will permanently
                        delete your account and remove all your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="confirm" className="text-red-200">
                          Type &quot;DELETE&quot; to confirm
                        </Label>
                        <Input
                          id="confirm"
                          className="glass border-red-900/50 bg-red-950/50"
                          placeholder="DELETE"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-red-200">
                          Enter your password
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="glass border-red-900/50 bg-red-950/50 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-red-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-red-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsDeleteAccountDialogOpen(false)}
                        className="border-red-900/50"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        className="bg-red-900 hover:bg-red-800"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </SettingsSection>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <SettingsSection
            icon={Shield}
            title="Security Overview"
            description="Your account security status and recommendations"
          >
            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-blue-200">Security Score</Label>
                    <span className="text-sm font-medium text-blue-200">
                      {securityScore}/100
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full"></div>
                    <Progress
                      value={securityScore}
                      className="h-2 relative z-10"
                    />
                  </div>
                  <p className="text-sm text-blue-200/70">
                    {securityScore >= 80
                      ? "Your account security is strong."
                      : securityScore >= 50
                      ? "Your account security is good, but could be improved."
                      : "Your account security needs attention."}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-blue-100">
                    Recommendations
                  </h3>
                  <div className="space-y-3">
                    {securityScore < 100 && !preferences.twoFactorAuth && (
                      <motion.div
                        className="flex items-start gap-3 p-4 rounded-lg glass border border-yellow-500/30 bg-yellow-950/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-300">
                            Enable two-factor authentication
                          </p>
                          <p className="text-sm text-yellow-200/70">
                            Add an extra layer of security to your account
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 border-yellow-500/30"
                            onClick={() => {
                              setMfaStep(1);
                              setIsMfaSetupDialogOpen(true);
                            }}
                          >
                            Set up now
                          </Button>
                        </div>
                      </motion.div>
                    )}
                    {!preferences.biometricLogin && (
                      <motion.div
                        className="flex items-start gap-3 p-4 rounded-lg glass border border-blue-500/30 bg-blue-950/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-300">
                            Enable biometric authentication
                          </p>
                          <p className="text-sm text-blue-200/70">
                            Use fingerprint or face ID for faster, more secure
                            login
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 border-blue-500/30"
                            onClick={() =>
                              handlePreferenceChange("biometricLogin", true)
                            }
                          >
                            Enable
                          </Button>
                        </div>
                      </motion.div>
                    )}
                    {hardwareWallets.length === 0 && (
                      <motion.div
                        className="flex items-start gap-3 p-4 rounded-lg glass border border-purple-500/30 bg-purple-950/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <HardDrive className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-purple-300">
                            Add a hardware wallet
                          </p>
                          <p className="text-sm text-purple-200/70">
                            Improve security with a hardware wallet for key
                            storage
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 border-purple-500/30"
                            onClick={() =>
                              setIsAddHardwareWalletDialogOpen(true)
                            }
                          >
                            Add hardware wallet
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">Password</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-blue-200">Current Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="glass border-blue-800/50 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-blue-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-blue-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-200">New Password</Label>
                  <Input type="password" className="glass border-blue-800/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-200">Confirm New Password</Label>
                  <Input type="password" className="glass border-blue-800/50" />
                </div>
                <div className="flex flex-col xs:flex-row gap-2">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                    onClick={() => setHasUnsavedChanges(true)}
                  >
                    Update Password
                  </Button>
                  <Button variant="outline">Generate Strong Password</Button>
                </div>
              </div>

              <Separator className="bg-blue-800/30 my-6" />

              <SettingItem
                title="Auto-Lock After Inactivity"
                description="Automatically lock your account after a period of inactivity"
              >
                <Switch
                  checked={preferences.autoLock}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange("autoLock", checked)
                  }
                />
              </SettingItem>

              {preferences.autoLock && (
                <div className="space-y-2 mt-4 p-4 glass border border-blue-900/30 rounded-lg">
                  <div className="flex justify-between">
                    <Label className="text-blue-200">
                      Auto-Lock Timeout (minutes)
                    </Label>
                    <span className="text-sm text-blue-300">
                      {preferences.autoLockTime} minutes
                    </span>
                  </div>
                  <Slider
                    value={[preferences.autoLockTime]}
                    min={1}
                    max={60}
                    step={1}
                    onValueChange={([value]: number[]) =>
                      handlePreferenceChange("autoLockTime", value)
                    }
                    className="my-4"
                  />
                </div>
              )}
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Active Sessions
              </h3>
              <div className="space-y-4">
                {connectedDevices.map((device) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-4 glass border border-blue-900/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-800 to-purple-900 flex items-center justify-center">
                        <device.icon className="h-5 w-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{device.name}</p>
                        <p className="text-sm text-blue-300">
                          {device.lastActive}
                        </p>
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDevice(device.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>Log out from this device</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                ))}
                <Button variant="outline" className="w-full">
                  Log Out All Other Sessions
                </Button>
              </div>
            </div>
          </SettingsSection>
        </TabsContent>

        {/* MFA Tab */}
        <TabsContent value="mfa" className="space-y-6">
          <SettingsSection
            icon={Key}
            title="Multi-Factor Authentication"
            description="Enhance your account security with multiple authentication factors"
          >
            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    Two-Factor Authentication (2FA)
                  </h3>
                  <p className="text-blue-200/70">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-3 py-1",
                      preferences.twoFactorAuth
                        ? "bg-green-900/20 text-green-400 border-green-500/50"
                        : "bg-yellow-900/20 text-yellow-400 border-yellow-500/50"
                    )}
                  >
                    {preferences.twoFactorAuth ? "Enabled" : "Disabled"}
                  </Badge>
                  <Switch
                    checked={preferences.twoFactorAuth}
                    onCheckedChange={(checked) => {
                      if (!checked) {
                        handlePreferenceChange("twoFactorAuth", false);
                        handlePreferenceChange("mfaMethod", "none");
                      } else {
                        setMfaStep(1);
                        setIsMfaSetupDialogOpen(true);
                      }
                    }}
                  />
                </div>
              </div>

              {preferences.twoFactorAuth ? (
                <div className="space-y-6">
                  <div className="p-4 glass border border-blue-900/30 rounded-lg">
                    <h3 className="font-medium text-white mb-3">
                      Current 2FA Method
                    </h3>
                    <div className="flex items-center gap-3 p-3 bg-blue-900/20 rounded-lg">
                      {preferences.mfaMethod === "authenticator" && (
                        <>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                            <Hexagon className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-white">Authenticator App</p>
                            <p className="text-sm text-blue-300">
                              Google Authenticator, Authy, or similar
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQrCodeDialogOpen(true)}
                      >
                        View QR Code
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMfaStep(1)}
                      >
                        Change 2FA Method
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-white">Recovery Codes</h3>
                    <p className="text-sm text-blue-200/70">
                      Recovery codes can be used to access your account if you
                      lose your 2FA device. Keep these codes in a safe place.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="p-2 glass border border-blue-900/30 rounded-md font-mono text-sm text-blue-300"
                        >
                          ••••• ••••• •••••
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        View Recovery Codes
                      </Button>
                      <Button variant="outline" size="sm">
                        Generate New Codes
                      </Button>
                      <Button variant="outline" size="sm">
                        Download Codes
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert className="bg-yellow-900/20 border-yellow-500/50 text-yellow-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="text-yellow-500">
                      Security Recommendation
                    </AlertTitle>
                    <AlertDescription className="text-yellow-300">
                      Two-factor authentication adds an important layer of
                      security to your account. We strongly recommend enabling
                      it.
                    </AlertDescription>
                  </Alert>
                  <div className="p-4 glass border border-blue-900/30 rounded-lg">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20">
                        <Hexagon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          Authenticator App
                        </h3>
                        <p className="text-sm text-blue-200/70">
                          Use an authenticator app like Google Authenticator,
                          Authy, or Microsoft Authenticator to generate
                          verification codes.
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setMfaStep(1);
                        setIsMfaSetupDialogOpen(true);
                      }}
                    >
                      Set Up Authenticator
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Biometric Authentication
              </h3>
              <div className="space-y-4">
                <SettingItem
                  title="Enable Biometric Login"
                  description="Use fingerprint, face recognition, or other biometric methods to log in"
                >
                  <Switch
                    checked={preferences.biometricLogin}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("biometricLogin", checked)
                    }
                  />
                </SettingItem>

                {preferences.biometricLogin && (
                  <div className="p-4 glass border border-blue-900/30 rounded-lg">
                    <h3 className="font-medium text-white mb-3">
                      Registered Biometrics
                    </h3>
                    <div className="flex items-center gap-3 p-3 bg-blue-900/20 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white">Touch ID - iPhone</p>
                        <p className="text-sm text-blue-300">
                          Added on May 12, 2023
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Add New Device
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SettingsSection>

          {/* MFA Setup Dialog */}
          <Dialog
            open={isMfaSetupDialogOpen}
            onOpenChange={setIsMfaSetupDialogOpen}
          >
            <DialogContent className="glass border-blue-800/30 bg-blue-950/90 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
                <DialogDescription>
                  {mfaStep === 1
                    ? "Scan the QR code with your authenticator app"
                    : "Enter the 6-digit verification code from your authenticator app"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {mfaStep === 1 ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-48 h-48 glass border border-blue-800/30 rounded-lg p-3 flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-blue-200" />
                    </div>
                    <p className="text-sm text-blue-200/70 text-center">
                      Open your authenticator app and scan this QR code to set
                      up two-factor authentication.
                    </p>
                    <div className="p-3 glass border border-blue-800/30 rounded-md w-full">
                      <p className="text-xs text-blue-200 mb-1">
                        Or enter this code manually:
                      </p>
                      <p className="font-mono text-sm text-white select-all">
                        ABCDEF123456
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Label htmlFor="verificationCode" className="text-blue-200">
                      Verification Code
                    </Label>
                    <Input
                      id="verificationCode"
                      className="glass border-blue-800/50 text-center text-lg font-mono"
                      maxLength={6}
                      value={mfaVerificationCode}
                      onChange={(e) =>
                        setMfaVerificationCode(
                          e.target.value.replace(/[^0-9]/g, "")
                        )
                      }
                    />
                    <p className="text-sm text-blue-200/70">
                      Enter the 6-digit code from your authenticator app to
                      verify setup.
                    </p>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (mfaStep === 2) setMfaStep(1);
                    else setIsMfaSetupDialogOpen(false);
                  }}
                >
                  {mfaStep === 2 ? "Back" : "Cancel"}
                </Button>
                <Button
                  onClick={setupMfa}
                  disabled={mfaStep === 2 && mfaVerificationCode.length !== 6}
                >
                  {mfaStep === 1 ? "Continue" : "Verify"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* QR Code Dialog */}
          <Dialog open={qrCodeDialogOpen} onOpenChange={setQrCodeDialogOpen}>
            <DialogContent className="glass border-blue-800/30 bg-blue-950/90 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Two-Factor Authentication QR Code</DialogTitle>
                <DialogDescription>
                  Scan this QR code with your authenticator app
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col items-center space-y-4 py-4">
                <div className="w-48 h-48 glass border border-blue-800/30 rounded-lg p-3 flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-blue-200" />
                </div>
                <p className="text-sm text-blue-200/70 text-center">
                  If you need to re-configure your authenticator app, use this
                  QR code.
                </p>
                <div className="p-3 glass border border-blue-800/30 rounded-md w-full">
                  <p className="text-xs text-blue-200 mb-1">
                    Or enter this code manually:
                  </p>
                  <p className="font-mono text-sm text-white select-all">
                    ABCDEF123456
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setQrCodeDialogOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Hardware Wallets Tab */}
        <TabsContent value="hardware" className="space-y-6">
          <SettingsSection
            icon={HardDrive}
            title="Hardware Wallets"
            description="Manage your hardware wallets and cold storage devices"
          >
            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    Connected Hardware Wallets
                  </h3>
                  <p className="text-blue-200/70">
                    Manage your hardware wallet connections
                  </p>
                </div>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={() => setIsAddHardwareWalletDialogOpen(true)}
                >
                  <HardDrive className="mr-2 h-4 w-4" />
                  Add Hardware Wallet
                </Button>
              </div>

              {hardwareWallets.length > 0 ? (
                <div className="space-y-4">
                  {hardwareWallets.map((wallet) => (
                    <motion.div
                      key={wallet.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between p-4 glass border border-blue-900/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-800 to-purple-900 flex items-center justify-center">
                          <HardDrive className="h-6 w-6 text-blue-300" />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {wallet.name}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-blue-300">
                            <span>Model: {wallet.model}</span>
                            <span>•</span>
                            <span>{wallet.lastUsed}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className="mt-1 bg-green-900/20 text-green-400 border-green-500/50"
                          >
                            {wallet.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeHardwareWallet(wallet.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                              <p>Remove this hardware wallet</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 glass border border-blue-900/30 rounded-lg flex flex-col items-center justify-center">
                  <HardDrive className="h-12 w-12 text-blue-500/50 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-1">
                    No Hardware Wallets
                  </h3>
                  <p className="text-blue-200/70 text-center mb-4">
                    You haven&apos;t connected any hardware wallets yet.
                    Hardware wallets provide the highest level of security for
                    your assets.
                  </p>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                    onClick={() => setIsAddHardwareWalletDialogOpen(true)}
                  >
                    Add Hardware Wallet
                  </Button>
                </div>
              )}
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Hardware Wallet Settings
              </h3>
              <div className="space-y-4">
                <SettingItem
                  title="Auto-detect Hardware Wallets"
                  description="Automatically detect connected hardware wallets"
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>

                <SettingItem
                  title="Require Device Confirmation"
                  description="Always require confirmation on the device for transactions"
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>

                <SettingItem
                  title="Show Legacy Accounts"
                  description="Display legacy accounts from your hardware wallets"
                >
                  <Switch
                    checked={false}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>

                <Separator className="bg-blue-800/30 my-4" />

                <div className="space-y-2">
                  <Label className="text-blue-200">
                    Account Derivation Path
                  </Label>
                  <Select defaultValue="standard">
                    <SelectTrigger className="glass border-blue-800/50">
                      <SelectValue placeholder="Select derivation path" />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-950 border-blue-800">
                      <SelectItem value="standard">
                        Standard (m/44&apos;/60&apos;/0&apos;/0)
                      </SelectItem>
                      <SelectItem value="ledger">
                        Ledger Live (m/44&apos;/60&apos;/0&apos;/0/0)
                      </SelectItem>
                      <SelectItem value="legacy">
                        Legacy (m/44&apos;/60&apos;/0&apos;)
                      </SelectItem>
                      <SelectItem value="custom">Custom Path</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 glass border border-blue-900/30 rounded-lg mt-4">
                  <h4 className="text-sm font-medium text-white mb-2">
                    Firmware Updates
                  </h4>
                  <p className="text-sm text-blue-200/70 mb-4">
                    Keep your hardware wallets up to date with the latest
                    firmware for security and feature improvements.
                  </p>
                  <Button variant="outline">Check for Updates</Button>
                </div>
              </div>
            </div>
          </SettingsSection>

          {/* Add Hardware Wallet Dialog */}
          <Dialog
            open={isAddHardwareWalletDialogOpen}
            onOpenChange={setIsAddHardwareWalletDialogOpen}
          >
            <DialogContent className="glass border-blue-800/30 bg-blue-950/90 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Hardware Wallet</DialogTitle>
                <DialogDescription>
                  Connect and configure your hardware wallet device
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="walletName" className="text-blue-200">
                    Name
                  </Label>
                  <Input
                    id="walletName"
                    className="glass border-blue-800/50"
                    placeholder="My Ledger"
                    value={newHardwareWallet.name}
                    onChange={(e) =>
                      setNewHardwareWallet({
                        ...newHardwareWallet,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="walletModel" className="text-blue-200">
                    Model
                  </Label>
                  <Select
                    value={newHardwareWallet.model}
                    onValueChange={(value) =>
                      setNewHardwareWallet({
                        ...newHardwareWallet,
                        model: value,
                      })
                    }
                  >
                    <SelectTrigger
                      id="walletModel"
                      className="glass border-blue-800/50"
                    >
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-950 border-blue-800">
                      <SelectItem value="Ledger Nano S">
                        Ledger Nano S
                      </SelectItem>
                      <SelectItem value="Ledger Nano X">
                        Ledger Nano X
                      </SelectItem>
                      <SelectItem value="Trezor One">Trezor One</SelectItem>
                      <SelectItem value="Trezor Model T">
                        Trezor Model T
                      </SelectItem>
                      <SelectItem value="KeepKey">KeepKey</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 bg-blue-900/20 rounded-md">
                  <p className="text-sm text-blue-200">
                    Please ensure your device is connected to your computer and
                    unlocked.
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddHardwareWalletDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={addHardwareWallet}
                  disabled={!newHardwareWallet.name || !newHardwareWallet.model}
                >
                  Connect Device
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Networks Tab */}
        <TabsContent value="network" className="space-y-6">
          <SettingsSection
            icon={Network}
            title="Network Configuration"
            description="Manage blockchain networks and connection settings"
          >
            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-white">Networks</h3>
                  <p className="text-blue-200/70">
                    Manage your blockchain network connections
                  </p>
                </div>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={() => setIsAddNetworkDialogOpen(true)}
                >
                  <Network className="mr-2 h-4 w-4" />
                  Add Network
                </Button>
              </div>

              <div className="space-y-4">
                {networks.map((network) => (
                  <motion.div
                    key={network.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-4 glass border border-blue-900/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-800 to-purple-900 flex items-center justify-center">
                        <Network className="h-5 w-5 text-blue-300" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white">
                            {network.name}
                          </p>
                          {network.isDefault && (
                            <Badge
                              variant="outline"
                              className="bg-blue-900/20 text-blue-400 border-blue-500/50"
                            >
                              Default
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-blue-300 flex flex-wrap gap-x-3">
                          <span>Chain ID: {network.chainId}</span>
                          <span>Currency: {network.currency}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!network.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDefaultNetwork(network.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeNetwork(network.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            <p>Remove this network</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Network Settings
              </h3>
              <div className="space-y-4">
                <SettingItem
                  title="Auto-switch Networks"
                  description="Automatically switch networks based on the dApp requirements"
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>

                <SettingItem
                  title="Network Security Warnings"
                  description="Show security warnings when connecting to non-verified networks"
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>

                <Separator className="bg-blue-800/30 my-4" />

                <div className="space-y-2">
                  <Label className="text-blue-200">
                    Default Gas Price Strategy
                  </Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="glass border-blue-800/50">
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-950 border-blue-800">
                      <SelectItem value="low">Economy (Slower)</SelectItem>
                      <SelectItem value="medium">
                        Standard (Recommended)
                      </SelectItem>
                      <SelectItem value="high">Fast (Higher Cost)</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 glass border border-blue-900/30 rounded-lg mt-4">
                  <h4 className="text-sm font-medium text-white mb-2">
                    RPC Connection Timeout
                  </h4>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-blue-300">
                      Timeout seconds
                    </span>
                    <span className="text-sm text-blue-300">30 seconds</span>
                  </div>
                  <Slider
                    defaultValue={[30]}
                    min={5}
                    max={60}
                    step={5}
                    className="my-4"
                    onValueChange={() => setHasUnsavedChanges(true)}
                  />
                </div>
              </div>
            </div>
          </SettingsSection>

          {/* Add Network Dialog */}
          <Dialog
            open={isAddNetworkDialogOpen}
            onOpenChange={setIsAddNetworkDialogOpen}
          >
            <DialogContent className="glass border-blue-800/30 bg-blue-950/90 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Network</DialogTitle>
                <DialogDescription>
                  Configure a new blockchain network connection
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="networkName" className="text-blue-200">
                    Network Name
                  </Label>
                  <Input
                    id="networkName"
                    className="glass border-blue-800/50"
                    placeholder="Avalanche C-Chain"
                    value={newNetwork.name}
                    onChange={(e) =>
                      setNewNetwork({ ...newNetwork, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rpcUrl" className="text-blue-200">
                    RPC URL
                  </Label>
                  <Input
                    id="rpcUrl"
                    className="glass border-blue-800/50"
                    placeholder="https://api.avax.network/ext/bc/C/rpc"
                    value={newNetwork.url}
                    onChange={(e) =>
                      setNewNetwork({ ...newNetwork, url: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chainId" className="text-blue-200">
                    Chain ID
                  </Label>
                  <Input
                    id="chainId"
                    type="number"
                    className="glass border-blue-800/50"
                    placeholder="43114"
                    value={newNetwork.chainId}
                    onChange={(e) =>
                      setNewNetwork({ ...newNetwork, chainId: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-blue-200">
                    Currency Symbol
                  </Label>
                  <Input
                    id="currency"
                    className="glass border-blue-800/50"
                    placeholder="AVAX"
                    value={newNetwork.currency}
                    onChange={(e) =>
                      setNewNetwork({ ...newNetwork, currency: e.target.value })
                    }
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddNetworkDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={addNetwork}
                  disabled={
                    !newNetwork.name ||
                    !newNetwork.url ||
                    !newNetwork.chainId ||
                    !newNetwork.currency
                  }
                >
                  Add Network
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Address Book Tab */}
        <TabsContent value="address" className="space-y-6">
          <SettingsSection
            icon={UserPlus}
            title="Address Book"
            description="Manage saved addresses for quick and secure transactions"
          >
            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    Saved Addresses
                  </h3>
                  <p className="text-blue-200/70">
                    Quickly access frequently used addresses
                  </p>
                </div>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={() => setIsAddAddressDialogOpen(true)}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Address
                </Button>
              </div>

              {addressBook.length > 0 ? (
                <div className="space-y-4">
                  {addressBook.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 glass border border-blue-900/30 rounded-lg gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-800 to-purple-900 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white">{entry.name}</p>
                          <p className="text-sm text-blue-300 truncate">
                            {entry.address}
                          </p>
                          {entry.notes && (
                            <p className="text-xs text-blue-200/70 mt-1">
                              {entry.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm">
                                <QrCode className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                              <p>Show QR Code</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                              <p>Send Transaction</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAddress(entry.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                              <p>Remove address</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 glass border border-blue-900/30 rounded-lg flex flex-col items-center justify-center">
                  <UserPlus className="h-12 w-12 text-blue-500/50 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-1">
                    No Saved Addresses
                  </h3>
                  <p className="text-blue-200/70 text-center mb-4">
                    Your address book is empty. Add addresses to quickly send
                    transactions without typing full addresses.
                  </p>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                    onClick={() => setIsAddAddressDialogOpen(true)}
                  >
                    Add Address
                  </Button>
                </div>
              )}
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Address Book Settings
              </h3>
              <div className="space-y-4">
                <SettingItem
                  title="Auto-save New Addresses"
                  description="Automatically save addresses you've sent transactions to"
                >
                  <Switch
                    checked={false}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>

                <SettingItem
                  title="Address Name Auto-completion"
                  description="Show address book suggestions when typing in transaction forms"
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>

                <Separator className="bg-blue-800/30 my-4" />

                <div className="flex flex-col xs:flex-row gap-2">
                  <Button variant="outline" className="flex-1">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Addresses
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Export Addresses
                  </Button>
                </div>
              </div>
            </div>
          </SettingsSection>

          {/* Add Address Dialog */}
          <Dialog
            open={isAddAddressDialogOpen}
            onOpenChange={setIsAddAddressDialogOpen}
          >
            <DialogContent className="glass border-blue-800/30 bg-blue-950/90 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Address</DialogTitle>
                <DialogDescription>
                  Save a new address to your address book
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="addressName" className="text-blue-200">
                    Name
                  </Label>
                  <Input
                    id="addressName"
                    className="glass border-blue-800/50"
                    placeholder="Exchange Wallet"
                    value={newAddress.name}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressValue" className="text-blue-200">
                    Address
                  </Label>
                  <Input
                    id="addressValue"
                    className="glass border-blue-800/50 font-mono text-sm"
                    placeholder="0x..."
                    value={newAddress.address}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, address: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressNotes" className="text-blue-200">
                    Notes (Optional)
                  </Label>
                  <Input
                    id="addressNotes"
                    className="glass border-blue-800/50"
                    placeholder="Personal savings wallet"
                    value={newAddress.notes}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, notes: e.target.value })
                    }
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddAddressDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={addAddress}
                  disabled={!newAddress.name || !newAddress.address}
                >
                  Save Address
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <SettingsSection
            icon={CreditCard}
            title="Payment Methods"
            description="Manage your payment methods for buying and selling crypto"
          >
            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    Payment Methods
                  </h3>
                  <p className="text-blue-200/70">
                    Manage your payment methods for buying and selling crypto
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-4 glass border border-blue-900/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-800 to-purple-900 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-300" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white">
                            {method.type}
                          </p>
                          {method.isDefault && (
                            <Badge
                              variant="outline"
                              className="bg-blue-900/20 text-blue-400 border-blue-500/50"
                            >
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-blue-300">
                          {method.type === "Credit Card"
                            ? `•••• •••• •••• ${method.last4} | Expires ${method.expiry}`
                            : `${method.name} (•••• ${method.last4})`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!method.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDefaultPaymentMethod(method.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removePaymentMethod(method.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            <p>Remove this payment method</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Billing Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-blue-200">Address Line 1</Label>
                  <Input
                    defaultValue="123 Blockchain Street"
                    className="glass border-blue-800/50"
                    onChange={() => setHasUnsavedChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-200">Address Line 2</Label>
                  <Input
                    defaultValue="Apt 42"
                    className="glass border-blue-800/50"
                    onChange={() => setHasUnsavedChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-200">City</Label>
                  <Input
                    defaultValue="San Francisco"
                    className="glass border-blue-800/50"
                    onChange={() => setHasUnsavedChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-200">State/Province</Label>
                  <Input
                    defaultValue="California"
                    className="glass border-blue-800/50"
                    onChange={() => setHasUnsavedChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-200">Postal Code</Label>
                  <Input
                    defaultValue="94105"
                    className="glass border-blue-800/50"
                    onChange={() => setHasUnsavedChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-200">Country</Label>
                  <Select defaultValue="US">
                    <SelectTrigger className="glass border-blue-800/50">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-950 border-blue-800">
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="JP">Japan</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Subscription
              </h3>
              <div className="p-4 glass border border-blue-900/30 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-white">Current Plan</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">
                        Pro
                      </Badge>
                      <span className="text-blue-300">$29.99/month</span>
                    </div>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>
                <Separator className="bg-blue-800/30 my-4" />
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">
                    Plan Features
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-blue-200">
                        Unlimited transactions
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-blue-200">Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-blue-200">Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-blue-200">
                        Lower transaction fees
                      </span>
                    </li>
                  </ul>
                </div>
                <Separator className="bg-blue-800/30 my-4" />
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">
                    Billing Information
                  </h4>
                  <div className="text-sm text-blue-300">
                    <p>Next billing date: June 15, 2023</p>
                    <p>Payment method: Visa ending in 4242</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline">Billing History</Button>
                <Button variant="outline" className="text-red-400">
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </SettingsSection>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <SettingsSection
            icon={Bell}
            title="Notification Preferences"
            description="Manage how and when you receive notifications"
          >
            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Notification Channels
              </h3>
              <div className="space-y-4">
                <SettingItem
                  title="Email Notifications"
                  description="Receive notifications via email"
                >
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("emailNotifications", checked)
                    }
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Push Notifications"
                  description="Receive notifications on your devices"
                >
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("pushNotifications", checked)
                    }
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="SMS Notifications"
                  description="Receive notifications via text message"
                >
                  <Switch
                    checked={preferences.smsNotifications}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("smsNotifications", checked)
                    }
                  />
                </SettingItem>
              </div>
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Notification Types
              </h3>
              <div className="space-y-4">
                <SettingItem
                  title="Security Alerts"
                  description="Login attempts, password changes, etc."
                >
                  <Switch
                    checked={preferences.securityAlerts}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("securityAlerts", checked)
                    }
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Transaction Updates"
                  description="Deposits, withdrawals, transfers, etc."
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Price Alerts"
                  description="Significant price changes for your assets"
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Marketing & Promotions"
                  description="News, updates, and special offers"
                >
                  <Switch
                    checked={preferences.marketingEmails}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("marketingEmails", checked)
                    }
                  />
                </SettingItem>
              </div>
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Notification Schedule
              </h3>
              <div className="space-y-4">
                <SettingItem
                  title="Quiet Hours"
                  description="Don't send notifications during these hours"
                >
                  <Switch
                    checked={false}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>

                <div className="p-4 glass border border-blue-900/30 rounded-lg mt-4">
                  <h4 className="text-sm font-medium text-white mb-2">
                    Quiet Hours Schedule
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-blue-200">Start Time</Label>
                      <Select defaultValue="22">
                        <SelectTrigger className="glass border-blue-800/50">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="bg-blue-950 border-blue-800">
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i.toString().padStart(2, "0")}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-blue-200">End Time</Label>
                      <Select defaultValue="7">
                        <SelectTrigger className="glass border-blue-800/50">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="bg-blue-950 border-blue-800">
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i.toString().padStart(2, "0")}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SettingsSection>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <SettingsSection
            icon={Palette}
            title="Theme Settings"
            description="Customize the look and feel of your dashboard"
          >
            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Color Theme
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    theme === "light"
                      ? "border-blue-500 bg-blue-950/30"
                      : "border-blue-900/50 bg-blue-950/10 hover:bg-blue-950/20"
                  }`}
                  onClick={() => {
                    setTheme("light");
                    handlePreferenceChange("colorMode", "light");
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sun className="h-5 w-5 text-blue-300" />
                      <span className="text-white">Light</span>
                    </div>
                    {theme === "light" && (
                      <Check className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="h-20 rounded-md bg-white border border-gray-200"></div>
                </div>
                <div
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    theme === "dark"
                      ? "border-blue-500 bg-blue-950/30"
                      : "border-blue-900/50 bg-blue-950/10 hover:bg-blue-950/20"
                  }`}
                  onClick={() => {
                    setTheme("dark");
                    handlePreferenceChange("colorMode", "dark");
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Moon className="h-5 w-5 text-blue-300" />
                      <span className="text-white">Dark</span>
                    </div>
                    {theme === "dark" && (
                      <Check className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="h-20 rounded-md bg-gray-900 border border-gray-800"></div>
                </div>
                <div
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    theme === "system"
                      ? "border-blue-500 bg-blue-950/30"
                      : "border-blue-900/50 bg-blue-950/10 hover:bg-blue-950/20"
                  }`}
                  onClick={() => {
                    setTheme("system");
                    handlePreferenceChange("colorMode", "system");
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Laptop className="h-5 w-5 text-blue-300" />
                      <span className="text-white">System</span>
                    </div>
                    {theme === "system" && (
                      <Check className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="h-20 rounded-md bg-gradient-to-r from-gray-900 to-white border border-gray-400"></div>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Accent Color
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {["blue", "purple", "green", "red", "orange", "pink"].map(
                  (color) => (
                    <div
                      key={color}
                      className={`h-10 rounded-md cursor-pointer transition-all ${
                        color === "blue"
                          ? "ring-2 ring-offset-2 ring-blue-500 ring-offset-blue-950"
                          : ""
                      }`}
                      style={{
                        background: `var(--${color}-500)`,
                        backgroundColor:
                          color === "blue"
                            ? "#3b82f6"
                            : color === "purple"
                            ? "#8b5cf6"
                            : color === "green"
                            ? "#10b981"
                            : color === "red"
                            ? "#ef4444"
                            : color === "orange"
                            ? "#f97316"
                            : "#ec4899",
                      }}
                      onClick={() => setHasUnsavedChanges(true)}
                    />
                  )
                )}
              </div>
              <div className="mt-6 space-y-4">
                <SettingItem
                  title="Custom Gradients"
                  description="Use gradient backgrounds throughout the app"
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
                <SettingItem
                  title="Glassmorphism"
                  description="Use glass-like transparency effects"
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
              </div>
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Interface Settings
              </h3>
              <div className="space-y-4">
                <SettingItem
                  title="Sound Effects"
                  description="Play sound effects for actions and notifications"
                >
                  <Switch
                    checked={preferences.soundEffects}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("soundEffects", checked)
                    }
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Haptic Feedback"
                  description="Enable vibration feedback on mobile devices"
                >
                  <Switch
                    checked={preferences.hapticFeedback}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("hapticFeedback", checked)
                    }
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Animations"
                  description="Enable animations throughout the interface"
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Show Balance in Header"
                  description="Display your total balance in the header"
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
              </div>
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Accessibility
              </h3>
              <div className="space-y-4">
                <SettingItem
                  title="Reduce Motion"
                  description="Minimize animations and transitions"
                >
                  <Switch
                    checked={false}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="High Contrast"
                  description="Increase contrast for better visibility"
                >
                  <Switch
                    checked={false}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-blue-200">Text Size</Label>
                    <span className="text-blue-300">Default</span>
                  </div>
                  <Slider
                    value={[100]}
                    min={75}
                    max={150}
                    step={5}
                    onValueChange={() => setHasUnsavedChanges(true)}
                  />
                </div>
              </div>
            </div>
          </SettingsSection>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <SettingsSection
            icon={Lock}
            title="Privacy Settings"
            description="Manage your privacy preferences and data sharing"
          >
            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Privacy Preferences
              </h3>
              <div className="space-y-4">
                <SettingItem
                  title="Data Collection"
                  description="Allow us to collect usage data to improve our services"
                >
                  <Switch
                    checked={preferences.dataSharing}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange("dataSharing", checked)
                    }
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Show Balance in Public Profile"
                  description="Display your account balance on your public profile"
                >
                  <Switch
                    checked={false}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Transaction Privacy"
                  description="Hide transaction details from other users"
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Analytics Cookies"
                  description="Allow cookies for analytics purposes"
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
              </div>

              <div className="space-y-2 mt-6">
                <Label className="text-blue-200">
                  Session Timeout (minutes)
                </Label>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-300">
                    Auto-logout after inactivity
                  </span>
                  <span className="text-sm text-blue-300">
                    {preferences.sessionTimeout} minutes
                  </span>
                </div>
                <Slider
                  value={[preferences.sessionTimeout]}
                  min={5}
                  max={60}
                  step={5}
                  onValueChange={([value]: [number]) =>
                    handlePreferenceChange("sessionTimeout", value)
                  }
                />
              </div>
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Data Management
              </h3>
              <div className="space-y-4">
                <div className="p-4 glass border border-blue-900/30 rounded-lg">
                  <h3 className="font-medium text-white mb-2">Data Export</h3>
                  <p className="text-sm text-blue-200/70 mb-4">
                    Download a copy of your personal data and transaction
                    history
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export All Data
                    </Button>
                    <Select defaultValue="json">
                      <SelectTrigger className="w-32 glass border-blue-800/50">
                        <SelectValue placeholder="Format" />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-950 border-blue-800">
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="p-4 glass border border-red-900/30 bg-red-950/10 rounded-lg">
                  <h3 className="font-medium text-red-400 mb-2">
                    Data Deletion
                  </h3>
                  <p className="text-sm text-red-200/70 mb-4">
                    Request deletion of your personal data in accordance with
                    privacy regulations
                  </p>
                  <Button
                    variant="destructive"
                    className="bg-red-900 hover:bg-red-800"
                  >
                    Request Data Deletion
                  </Button>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Cookie Preferences
              </h3>
              <div className="space-y-4">
                <SettingItem
                  title="Essential Cookies"
                  description="Required for the website to function properly"
                >
                  <Switch checked={true} disabled />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Performance Cookies"
                  description="Help us improve our website by collecting anonymous information"
                >
                  <Switch
                    checked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Marketing Cookies"
                  description="Used to track visitors across websites for advertising purposes"
                >
                  <Switch
                    checked={false}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
              </div>
            </div>
          </SettingsSection>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <SettingsSection
            icon={SettingsIcon}
            title="Developer Settings"
            description="Advanced settings for developers and power users"
          >
            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    Developer Mode
                  </h3>
                  <p className="text-blue-200/70">
                    Enable advanced features for developers
                  </p>
                </div>
                <Switch
                  checked={preferences.developerMode}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange("developerMode", checked)
                  }
                />
              </div>

              {preferences.developerMode && (
                <div className="space-y-6">
                  <SettingItem
                    title="API Access"
                    description="Enable API access to your account"
                  >
                    <Switch
                      checked={preferences.apiAccess}
                      onCheckedChange={(checked) =>
                        handlePreferenceChange("apiAccess", checked)
                      }
                    />
                  </SettingItem>

                  {preferences.apiAccess && (
                    <div className="space-y-4 mt-4">
                      <div className="p-4 glass border border-blue-900/30 rounded-lg">
                        <h3 className="font-medium text-white mb-2">
                          API Keys
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-mono text-sm text-blue-300">
                                sk_live_*****************
                              </p>
                              <p className="text-xs text-blue-200/70">
                                Created: May 10, 2023
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Revoke
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-mono text-sm text-blue-300">
                                sk_test_*****************
                              </p>
                              <p className="text-xs text-blue-200/70">
                                Created: April 22, 2023
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Revoke
                            </Button>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4">
                          Generate New API Key
                        </Button>
                      </div>

                      <div className="p-4 glass border border-blue-900/30 rounded-lg">
                        <h3 className="font-medium text-white mb-2">
                          Webhooks
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-blue-300 truncate">
                              https://example.com/webhook/crypto
                            </p>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4">
                          Add Webhook
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Backup & Recovery
              </h3>
              <div className="space-y-4">
                <div className="p-4 glass border border-blue-900/30 rounded-lg">
                  <h3 className="font-medium text-white mb-2">
                    Backup Seed Phrase
                  </h3>
                  <p className="text-sm text-blue-200/70 mb-4">
                    Your seed phrase is the master key to your wallet. Keep it
                    safe and never share it with anyone.
                  </p>
                  <Button variant="outline">
                    <Shield className="mr-2 h-4 w-4" />
                    View Seed Phrase
                  </Button>
                </div>

                <div className="p-4 glass border border-blue-900/30 rounded-lg">
                  <h3 className="font-medium text-white mb-2">
                    Export Private Keys
                  </h3>
                  <p className="text-sm text-blue-200/70 mb-4">
                    Export private keys for your wallets. This is sensitive
                    information that should be kept secure.
                  </p>
                  <Button variant="outline">
                    <Key className="mr-2 h-4 w-4" />
                    Export Private Keys
                  </Button>
                </div>

                <div className="p-4 glass border border-blue-900/30 rounded-lg">
                  <h3 className="font-medium text-white mb-2">
                    Automatic Backups
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="space-y-0.5">
                      <Label className="text-white">
                        Enable Automatic Backups
                      </Label>
                      <p className="text-sm text-blue-200/70">
                        Backup your wallet data automatically
                      </p>
                    </div>
                    <Switch
                      checked={true}
                      onCheckedChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                System Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-200/70">App Version</span>
                  <span className="text-sm text-blue-300">2.4.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-200/70">Last Updated</span>
                  <span className="text-sm text-blue-300">May 15, 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-200/70">Device ID</span>
                  <span className="text-sm font-mono text-blue-300">
                    d8f3a7b2e9c6
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-200/70">Network</span>
                  <span className="text-sm text-blue-300">Mainnet</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <HardDrive className="mr-2 h-4 w-4" />
                View System Logs
              </Button>
            </div>

            <div className="glass rounded-lg border border-blue-800/30 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Advanced Features
              </h3>
              <div className="space-y-4">
                <SettingItem
                  title="Debug Mode"
                  description="Enable detailed logging for troubleshooting"
                >
                  <Switch
                    checked={false}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Custom RPC Commands"
                  description="Allow execution of custom RPC commands"
                >
                  <Switch
                    checked={false}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
                <Separator className="bg-blue-800/30" />
                <SettingItem
                  title="Experimental Features"
                  description="Enable experimental features that are still in development"
                >
                  <Switch
                    checked={false}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </SettingItem>
              </div>
            </div>
          </SettingsSection>
        </TabsContent>

        {/* Settings Import/Export */}
        <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
          <DialogContent className="glass border-blue-800/30 bg-blue-950/90 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Export Settings</DialogTitle>
              <DialogDescription>
                Export your settings to a JSON file
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="p-4 glass border border-blue-900/30 rounded-lg">
                <p className="text-blue-200 mb-4">
                  This will export the following settings:
                </p>
                <ul className="space-y-2 text-sm text-blue-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    User preferences
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Connected wallets
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Network configurations
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Address book
                  </li>
                </ul>
                <Alert className="mt-4 bg-yellow-900/20 border-yellow-500/50">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <AlertTitle className="text-yellow-500">Important</AlertTitle>
                  <AlertDescription className="text-yellow-300">
                    This file contains sensitive information. Keep it secure and
                    never share it with others.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsExportDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={exportSettings}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Settings
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
          <DialogContent className="glass border-blue-800/30 bg-blue-950/90 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Import Settings</DialogTitle>
              <DialogDescription>
                Import settings from a previously exported file
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="p-6 glass border border-blue-900/30 rounded-lg flex flex-col items-center justify-center">
                <FileText className="h-12 w-12 text-blue-400 mb-4" />
                <p className="text-blue-200 text-center mb-6">
                  Select a CryptoFlow settings file to import
                </p>
                <Input
                  type="file"
                  accept=".json"
                  className="glass border-blue-800/50"
                  onChange={importSettings}
                />
              </div>
              <Alert className="mt-4 bg-yellow-900/20 border-yellow-500/50">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <AlertTitle className="text-yellow-500">Warning</AlertTitle>
                <AlertDescription className="text-yellow-300">
                  Importing settings will overwrite your current configuration.
                  Make sure you trust the source of the file.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsImportDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rest of the tabs similar to the existing ones but with improved UI */}
        {/* For brevity, I've focused on implementing the most important new features */}

        {/* Add remaining tabs: payments, notifications, appearance, privacy, advanced */}
      </Tabs>

      {/* Unsaved Changes Indicator */}
      <AnimatePresence>
        {hasUnsavedChanges && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className="glass border-blue-800/30 shadow-lg shadow-blue-900/20">
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <p className="text-white">You have unsaved changes</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setHasUnsavedChanges(false)}
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                    onClick={saveChanges}
                  >
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Action Buttons */}
      <div className="fixed right-6 top-1/3 z-40 flex flex-col gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="glass border-blue-800/30 hover:bg-blue-800/30"
                onClick={() => setIsExportDialogOpen(true)}
              >
                <Download className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Export Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="glass border-blue-800/30 hover:bg-blue-800/30"
                onClick={() => setIsImportDialogOpen(true)}
              >
                <Upload className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Import Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
}
