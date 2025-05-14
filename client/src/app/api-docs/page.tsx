"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Book,
  Check,
  Code,
  Copy,
  ExternalLink,
  FileJson,
  Globe,
  Info,
  Key,
  Lock,
  RefreshCw,
  Search,
  Server,
  Shield,
  Terminal,
  Webhook,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ApiDocsPage() {
  const [activeEndpoint, setActiveEndpoint] = useState("get-wallets");
  const [copiedText, setCopiedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [searchQuery, setSearchQuery] = useState("");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(""), 2000);
  };

  // Filter endpoints based on search query
  const filterEndpoints = (endpoints: any, query: any) => {
    if (!query) return endpoints;
    return endpoints.filter(
      (endpoint: any) =>
        endpoint.name.toLowerCase().includes(query.toLowerCase()) ||
        endpoint.description.toLowerCase().includes(query.toLowerCase()) ||
        endpoint.path.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Endpoint categories
  const endpointCategories = [
    {
      name: "Wallets",
      icon: <Shield className="h-4 w-4" />,
      endpoints: [
        {
          id: "get-wallets",
          name: "List Wallets",
          method: "GET",
          path: "/v2/wallets",
          description: "Returns a list of wallets for the authenticated user",
          parameters: [
            {
              name: "limit",
              type: "integer",
              required: false,
              description:
                "Maximum number of wallets to return (default: 10, max: 100)",
            },
            {
              name: "offset",
              type: "integer",
              required: false,
              description: "Number of wallets to skip (default: 0)",
            },
            {
              name: "sort",
              type: "string",
              required: false,
              description:
                "Sort order (created_at, balance) (default: created_at)",
            },
            {
              name: "order",
              type: "string",
              required: false,
              description: "Sort direction (asc, desc) (default: desc)",
            },
          ],
          responses: {
            "200": {
              description: "A list of wallets",
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        type: { type: "string" },
                        address: { type: "string" },
                        balance: { type: "number" },
                        currency: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                      },
                    },
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      total: { type: "integer" },
                      limit: { type: "integer" },
                      offset: { type: "integer" },
                      has_more: { type: "boolean" },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      code: { type: "string" },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        {
          id: "get-wallet",
          name: "Get Wallet",
          method: "GET",
          path: "/v2/wallets/{wallet_id}",
          description: "Returns details of a specific wallet",
          parameters: [
            {
              name: "wallet_id",
              type: "string",
              required: true,
              description: "Unique identifier of the wallet",
              in: "path",
            },
          ],
          responses: {
            "200": {
              description: "Wallet details",
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  type: { type: "string" },
                  address: { type: "string" },
                  balance: { type: "number" },
                  currency: { type: "string" },
                  created_at: { type: "string", format: "date-time" },
                  updated_at: { type: "string", format: "date-time" },
                },
              },
            },
            "404": {
              description: "Wallet not found",
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      code: { type: "string" },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        {
          id: "create-wallet",
          name: "Create Wallet",
          method: "POST",
          path: "/v2/wallets",
          description: "Creates a new wallet for the authenticated user",
          parameters: [
            {
              name: "name",
              type: "string",
              required: true,
              description: "Name of the wallet",
              in: "body",
            },
            {
              name: "type",
              type: "string",
              required: true,
              description: "Type of wallet (bitcoin, ethereum, etc.)",
              in: "body",
            },
          ],
          responses: {
            "201": {
              description: "Wallet created successfully",
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  type: { type: "string" },
                  address: { type: "string" },
                  balance: { type: "number" },
                  currency: { type: "string" },
                  created_at: { type: "string", format: "date-time" },
                  updated_at: { type: "string", format: "date-time" },
                },
              },
            },
            "400": {
              description: "Invalid request",
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      code: { type: "string" },
                      message: { type: "string" },
                      details: { type: "array" },
                    },
                  },
                },
              },
            },
          },
        },
        {
          id: "update-wallet",
          name: "Update Wallet",
          method: "PATCH",
          path: "/v2/wallets/{wallet_id}",
          description: "Updates a specific wallet",
          parameters: [
            {
              name: "wallet_id",
              type: "string",
              required: true,
              description: "Unique identifier of the wallet",
              in: "path",
            },
            {
              name: "name",
              type: "string",
              required: false,
              description: "New name for the wallet",
              in: "body",
            },
          ],
          responses: {
            "200": {
              description: "Wallet updated successfully",
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  type: { type: "string" },
                  address: { type: "string" },
                  balance: { type: "number" },
                  currency: { type: "string" },
                  created_at: { type: "string", format: "date-time" },
                  updated_at: { type: "string", format: "date-time" },
                },
              },
            },
            "404": {
              description: "Wallet not found",
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      code: { type: "string" },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        {
          id: "delete-wallet",
          name: "Delete Wallet",
          method: "DELETE",
          path: "/v2/wallets/{wallet_id}",
          description: "Deletes a specific wallet",
          parameters: [
            {
              name: "wallet_id",
              type: "string",
              required: true,
              description: "Unique identifier of the wallet",
              in: "path",
            },
          ],
          responses: {
            "204": {
              description: "Wallet deleted successfully",
            },
            "404": {
              description: "Wallet not found",
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      code: { type: "string" },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
    {
      name: "Transactions",
      icon: <RefreshCw className="h-4 w-4" />,
      endpoints: [
        {
          id: "get-transactions",
          name: "List Transactions",
          method: "GET",
          path: "/v2/transactions",
          description:
            "Returns a list of transactions for the authenticated user",
          parameters: [
            {
              name: "wallet_id",
              type: "string",
              required: false,
              description: "Filter transactions by wallet ID",
            },
            {
              name: "type",
              type: "string",
              required: false,
              description:
                "Filter by transaction type (send, receive, exchange)",
            },
            {
              name: "status",
              type: "string",
              required: false,
              description: "Filter by status (pending, completed, failed)",
            },
            {
              name: "from_date",
              type: "string",
              required: false,
              description: "Filter transactions from this date (ISO 8601)",
            },
            {
              name: "to_date",
              type: "string",
              required: false,
              description: "Filter transactions to this date (ISO 8601)",
            },
            {
              name: "limit",
              type: "integer",
              required: false,
              description:
                "Maximum number of transactions to return (default: 10, max: 100)",
            },
            {
              name: "offset",
              type: "integer",
              required: false,
              description: "Number of transactions to skip (default: 0)",
            },
          ],
          responses: {
            "200": {
              description: "A list of transactions",
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        wallet_id: { type: "string" },
                        type: { type: "string" },
                        status: { type: "string" },
                        amount: { type: "number" },
                        fee: { type: "number" },
                        currency: { type: "string" },
                        recipient: { type: "string" },
                        sender: { type: "string" },
                        description: { type: "string" },
                        transaction_hash: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                      },
                    },
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      total: { type: "integer" },
                      limit: { type: "integer" },
                      offset: { type: "integer" },
                      has_more: { type: "boolean" },
                    },
                  },
                },
              },
            },
          },
        },
        {
          id: "get-transaction",
          name: "Get Transaction",
          method: "GET",
          path: "/v2/transactions/{transaction_id}",
          description: "Returns details of a specific transaction",
          parameters: [
            {
              name: "transaction_id",
              type: "string",
              required: true,
              description: "Unique identifier of the transaction",
              in: "path",
            },
          ],
          responses: {
            "200": {
              description: "Transaction details",
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  wallet_id: { type: "string" },
                  type: { type: "string" },
                  status: { type: "string" },
                  amount: { type: "number" },
                  fee: { type: "number" },
                  currency: { type: "string" },
                  recipient: { type: "string" },
                  sender: { type: "string" },
                  description: { type: "string" },
                  transaction_hash: { type: "string" },
                  created_at: { type: "string", format: "date-time" },
                  updated_at: { type: "string", format: "date-time" },
                },
              },
            },
            "404": {
              description: "Transaction not found",
            },
          },
        },
        {
          id: "create-transaction",
          name: "Create Transaction",
          method: "POST",
          path: "/v2/transactions",
          description: "Creates a new transaction",
          parameters: [
            {
              name: "wallet_id",
              type: "string",
              required: true,
              description: "ID of the wallet to send from",
              in: "body",
            },
            {
              name: "recipient",
              type: "string",
              required: true,
              description: "Recipient address",
              in: "body",
            },
            {
              name: "amount",
              type: "number",
              required: true,
              description: "Amount to send",
              in: "body",
            },
            {
              name: "currency",
              type: "string",
              required: true,
              description: "Currency code (BTC, ETH, etc.)",
              in: "body",
            },
            {
              name: "description",
              type: "string",
              required: false,
              description: "Transaction description",
              in: "body",
            },
          ],
          responses: {
            "201": {
              description: "Transaction created successfully",
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  wallet_id: { type: "string" },
                  type: { type: "string" },
                  status: { type: "string" },
                  amount: { type: "number" },
                  fee: { type: "number" },
                  currency: { type: "string" },
                  recipient: { type: "string" },
                  sender: { type: "string" },
                  description: { type: "string" },
                  transaction_hash: { type: "string" },
                  created_at: { type: "string", format: "date-time" },
                  updated_at: { type: "string", format: "date-time" },
                },
              },
            },
            "400": {
              description: "Invalid request",
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      code: { type: "string" },
                      message: { type: "string" },
                      details: { type: "array" },
                    },
                  },
                },
              },
            },
            "402": {
              description: "Insufficient funds",
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      code: { type: "string" },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
    {
      name: "Assets",
      icon: <Zap className="h-4 w-4" />,
      endpoints: [
        {
          id: "get-assets",
          name: "List Assets",
          method: "GET",
          path: "/v2/assets",
          description: "Returns a list of supported assets",
          parameters: [
            {
              name: "type",
              type: "string",
              required: false,
              description: "Filter by asset type (crypto, fiat, token)",
            },
            {
              name: "limit",
              type: "integer",
              required: false,
              description:
                "Maximum number of assets to return (default: 50, max: 200)",
            },
            {
              name: "offset",
              type: "integer",
              required: false,
              description: "Number of assets to skip (default: 0)",
            },
          ],
          responses: {
            "200": {
              description: "A list of assets",
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        code: { type: "string" },
                        name: { type: "string" },
                        type: { type: "string" },
                        logo_url: { type: "string" },
                        price_usd: { type: "number" },
                        price_change_24h: { type: "number" },
                        market_cap: { type: "number" },
                        volume_24h: { type: "number" },
                      },
                    },
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      total: { type: "integer" },
                      limit: { type: "integer" },
                      offset: { type: "integer" },
                      has_more: { type: "boolean" },
                    },
                  },
                },
              },
            },
          },
        },
        {
          id: "get-asset",
          name: "Get Asset",
          method: "GET",
          path: "/v2/assets/{asset_id}",
          description: "Returns details of a specific asset",
          parameters: [
            {
              name: "asset_id",
              type: "string",
              required: true,
              description: "Unique identifier or code of the asset",
              in: "path",
            },
          ],
          responses: {
            "200": {
              description: "Asset details",
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  code: { type: "string" },
                  name: { type: "string" },
                  type: { type: "string" },
                  logo_url: { type: "string" },
                  price_usd: { type: "number" },
                  price_change_24h: { type: "number" },
                  market_cap: { type: "number" },
                  volume_24h: { type: "number" },
                  description: { type: "string" },
                  website: { type: "string" },
                  explorer: { type: "string" },
                  whitepaper: { type: "string" },
                  max_supply: { type: "number" },
                  circulating_supply: { type: "number" },
                  total_supply: { type: "number" },
                },
              },
            },
            "404": {
              description: "Asset not found",
            },
          },
        },
        {
          id: "get-asset-price",
          name: "Get Asset Price",
          method: "GET",
          path: "/v2/assets/{asset_id}/price",
          description: "Returns current price of a specific asset",
          parameters: [
            {
              name: "asset_id",
              type: "string",
              required: true,
              description: "Unique identifier or code of the asset",
              in: "path",
            },
            {
              name: "currency",
              type: "string",
              required: false,
              description: "Currency to convert price to (default: USD)",
            },
          ],
          responses: {
            "200": {
              description: "Asset price",
              schema: {
                type: "object",
                properties: {
                  asset_id: { type: "string" },
                  code: { type: "string" },
                  price: { type: "number" },
                  currency: { type: "string" },
                  timestamp: { type: "string", format: "date-time" },
                },
              },
            },
            "404": {
              description: "Asset not found",
            },
          },
        },
        {
          id: "get-asset-history",
          name: "Get Asset Price History",
          method: "GET",
          path: "/v2/assets/{asset_id}/history",
          description: "Returns historical price data for a specific asset",
          parameters: [
            {
              name: "asset_id",
              type: "string",
              required: true,
              description: "Unique identifier or code of the asset",
              in: "path",
            },
            {
              name: "interval",
              type: "string",
              required: false,
              description:
                "Time interval (1h, 1d, 7d, 30d, 90d, 1y) (default: 1d)",
            },
            {
              name: "from_date",
              type: "string",
              required: false,
              description: "Start date (ISO 8601)",
            },
            {
              name: "to_date",
              type: "string",
              required: false,
              description: "End date (ISO 8601)",
            },
            {
              name: "currency",
              type: "string",
              required: false,
              description: "Currency to convert prices to (default: USD)",
            },
          ],
          responses: {
            "200": {
              description: "Asset price history",
              schema: {
                type: "object",
                properties: {
                  asset_id: { type: "string" },
                  code: { type: "string" },
                  currency: { type: "string" },
                  interval: { type: "string" },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        timestamp: { type: "string", format: "date-time" },
                        price: { type: "number" },
                        volume: { type: "number" },
                        market_cap: { type: "number" },
                      },
                    },
                  },
                },
              },
            },
            "404": {
              description: "Asset not found",
            },
          },
        },
      ],
    },
    {
      name: "Users",
      icon: <Lock className="h-4 w-4" />,
      endpoints: [
        {
          id: "get-user",
          name: "Get User",
          method: "GET",
          path: "/v2/users/me",
          description: "Returns details of the authenticated user",
          parameters: [],
          responses: {
            "200": {
              description: "User details",
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  email: { type: "string" },
                  name: { type: "string" },
                  phone: { type: "string" },
                  country: { type: "string" },
                  created_at: { type: "string", format: "date-time" },
                  updated_at: { type: "string", format: "date-time" },
                  verification_level: { type: "string" },
                  two_factor_enabled: { type: "boolean" },
                },
              },
            },
            "401": {
              description: "Unauthorized",
            },
          },
        },
        {
          id: "update-user",
          name: "Update User",
          method: "PATCH",
          path: "/v2/users/me",
          description: "Updates the authenticated user's details",
          parameters: [
            {
              name: "name",
              type: "string",
              required: false,
              description: "User's full name",
              in: "body",
            },
            {
              name: "phone",
              type: "string",
              required: false,
              description: "User's phone number",
              in: "body",
            },
            {
              name: "country",
              type: "string",
              required: false,
              description: "User's country code (ISO 3166-1 alpha-2)",
              in: "body",
            },
          ],
          responses: {
            "200": {
              description: "User updated successfully",
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  email: { type: "string" },
                  name: { type: "string" },
                  phone: { type: "string" },
                  country: { type: "string" },
                  created_at: { type: "string", format: "date-time" },
                  updated_at: { type: "string", format: "date-time" },
                  verification_level: { type: "string" },
                  two_factor_enabled: { type: "boolean" },
                },
              },
            },
            "400": {
              description: "Invalid request",
            },
            "401": {
              description: "Unauthorized",
            },
          },
        },
        {
          id: "change-password",
          name: "Change Password",
          method: "POST",
          path: "/v2/users/me/password",
          description: "Changes the authenticated user's password",
          parameters: [
            {
              name: "current_password",
              type: "string",
              required: true,
              description: "User's current password",
              in: "body",
            },
            {
              name: "new_password",
              type: "string",
              required: true,
              description: "User's new password",
              in: "body",
            },
          ],
          responses: {
            "200": {
              description: "Password changed successfully",
            },
            "400": {
              description: "Invalid request",
            },
            "401": {
              description: "Unauthorized or incorrect current password",
            },
          },
        },
        {
          id: "enable-2fa",
          name: "Enable Two-Factor Authentication",
          method: "POST",
          path: "/v2/users/me/2fa/enable",
          description: "Enables two-factor authentication for the user",
          parameters: [],
          responses: {
            "200": {
              description: "2FA setup information",
              schema: {
                type: "object",
                properties: {
                  secret: { type: "string" },
                  qr_code: { type: "string" },
                  backup_codes: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
            },
          },
        },
        {
          id: "verify-2fa",
          name: "Verify Two-Factor Authentication",
          method: "POST",
          path: "/v2/users/me/2fa/verify",
          description: "Verifies and completes 2FA setup",
          parameters: [
            {
              name: "code",
              type: "string",
              required: true,
              description: "Verification code from authenticator app",
              in: "body",
            },
            {
              name: "secret",
              type: "string",
              required: true,
              description: "Secret key from enable-2fa response",
              in: "body",
            },
          ],
          responses: {
            "200": {
              description: "2FA enabled successfully",
            },
            "400": {
              description: "Invalid code",
            },
            "401": {
              description: "Unauthorized",
            },
          },
        },
        {
          id: "disable-2fa",
          name: "Disable Two-Factor Authentication",
          method: "POST",
          path: "/v2/users/me/2fa/disable",
          description: "Disables two-factor authentication for the user",
          parameters: [
            {
              name: "code",
              type: "string",
              required: true,
              description:
                "Verification code from authenticator app or backup code",
              in: "body",
            },
          ],
          responses: {
            "200": {
              description: "2FA disabled successfully",
            },
            "400": {
              description: "Invalid code",
            },
            "401": {
              description: "Unauthorized",
            },
          },
        },
      ],
    },
    {
      name: "Analytics",
      icon: <Globe className="h-4 w-4" />,
      endpoints: [
        {
          id: "get-portfolio",
          name: "Get Portfolio",
          method: "GET",
          path: "/v2/analytics/portfolio",
          description: "Returns the user's portfolio summary",
          parameters: [
            {
              name: "currency",
              type: "string",
              required: false,
              description: "Currency to convert values to (default: USD)",
            },
          ],
          responses: {
            "200": {
              description: "Portfolio summary",
              schema: {
                type: "object",
                properties: {
                  total_value: { type: "number" },
                  currency: { type: "string" },
                  change_24h: { type: "number" },
                  change_24h_percentage: { type: "number" },
                  assets: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        asset_id: { type: "string" },
                        code: { type: "string" },
                        name: { type: "string" },
                        amount: { type: "number" },
                        value: { type: "number" },
                        percentage: { type: "number" },
                        price: { type: "number" },
                        change_24h: { type: "number" },
                        change_24h_percentage: { type: "number" },
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
            },
          },
        },
        {
          id: "get-portfolio-history",
          name: "Get Portfolio History",
          method: "GET",
          path: "/v2/analytics/portfolio/history",
          description: "Returns historical portfolio value data",
          parameters: [
            {
              name: "interval",
              type: "string",
              required: false,
              description:
                "Time interval (1h, 1d, 7d, 30d, 90d, 1y) (default: 1d)",
            },
            {
              name: "from_date",
              type: "string",
              required: false,
              description: "Start date (ISO 8601)",
            },
            {
              name: "to_date",
              type: "string",
              required: false,
              description: "End date (ISO 8601)",
            },
            {
              name: "currency",
              type: "string",
              required: false,
              description: "Currency to convert values to (default: USD)",
            },
          ],
          responses: {
            "200": {
              description: "Portfolio history",
              schema: {
                type: "object",
                properties: {
                  currency: { type: "string" },
                  interval: { type: "string" },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        timestamp: { type: "string", format: "date-time" },
                        value: { type: "number" },
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
            },
          },
        },
        {
          id: "get-transaction-stats",
          name: "Get Transaction Statistics",
          method: "GET",
          path: "/v2/analytics/transactions",
          description: "Returns transaction statistics",
          parameters: [
            {
              name: "period",
              type: "string",
              required: false,
              description:
                "Time period (day, week, month, year, all) (default: month)",
            },
            {
              name: "wallet_id",
              type: "string",
              required: false,
              description: "Filter by wallet ID",
            },
            {
              name: "currency",
              type: "string",
              required: false,
              description: "Currency to convert values to (default: USD)",
            },
          ],
          responses: {
            "200": {
              description: "Transaction statistics",
              schema: {
                type: "object",
                properties: {
                  period: { type: "string" },
                  currency: { type: "string" },
                  total_transactions: { type: "integer" },
                  total_sent: { type: "number" },
                  total_received: { type: "number" },
                  total_fees: { type: "number" },
                  average_transaction_value: { type: "number" },
                  largest_transaction: { type: "number" },
                  by_type: {
                    type: "object",
                    properties: {
                      send: { type: "integer" },
                      receive: { type: "integer" },
                      exchange: { type: "integer" },
                    },
                  },
                  by_status: {
                    type: "object",
                    properties: {
                      pending: { type: "integer" },
                      completed: { type: "integer" },
                      failed: { type: "integer" },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
            },
          },
        },
      ],
    },
    {
      name: "Webhooks",
      icon: <Webhook className="h-4 w-4" />,
      endpoints: [
        {
          id: "get-webhooks",
          name: "List Webhooks",
          method: "GET",
          path: "/v2/webhooks",
          description: "Returns a list of webhooks for the authenticated user",
          parameters: [],
          responses: {
            "200": {
              description: "A list of webhooks",
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        url: { type: "string" },
                        events: {
                          type: "array",
                          items: { type: "string" },
                        },
                        status: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
            },
          },
        },
        {
          id: "create-webhook",
          name: "Create Webhook",
          method: "POST",
          path: "/v2/webhooks",
          description: "Creates a new webhook",
          parameters: [
            {
              name: "url",
              type: "string",
              required: true,
              description: "URL to send webhook events to",
              in: "body",
            },
            {
              name: "events",
              type: "array",
              required: true,
              description: "Array of event types to subscribe to",
              in: "body",
              items: {
                type: "string",
                enum: [
                  "wallet.created",
                  "wallet.updated",
                  "wallet.deleted",
                  "transaction.created",
                  "transaction.updated",
                  "transaction.completed",
                  "transaction.failed",
                  "user.updated",
                  "price.alert",
                ],
              },
            },
            {
              name: "description",
              type: "string",
              required: false,
              description: "Description of the webhook",
              in: "body",
            },
          ],
          responses: {
            "201": {
              description: "Webhook created successfully",
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  url: { type: "string" },
                  events: {
                    type: "array",
                    items: { type: "string" },
                  },
                  status: { type: "string" },
                  created_at: { type: "string", format: "date-time" },
                  updated_at: { type: "string", format: "date-time" },
                  secret: { type: "string" },
                },
              },
            },
            "400": {
              description: "Invalid request",
            },
            "401": {
              description: "Unauthorized",
            },
          },
        },
        {
          id: "get-webhook",
          name: "Get Webhook",
          method: "GET",
          path: "/v2/webhooks/{webhook_id}",
          description: "Returns details of a specific webhook",
          parameters: [
            {
              name: "webhook_id",
              type: "string",
              required: true,
              description: "Unique identifier of the webhook",
              in: "path",
            },
          ],
          responses: {
            "200": {
              description: "Webhook details",
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  url: { type: "string" },
                  events: {
                    type: "array",
                    items: { type: "string" },
                  },
                  status: { type: "string" },
                  created_at: { type: "string", format: "date-time" },
                  updated_at: { type: "string", format: "date-time" },
                },
              },
            },
            "404": {
              description: "Webhook not found",
            },
          },
        },
        {
          id: "update-webhook",
          name: "Update Webhook",
          method: "PATCH",
          path: "/v2/webhooks/{webhook_id}",
          description: "Updates a specific webhook",
          parameters: [
            {
              name: "webhook_id",
              type: "string",
              required: true,
              description: "Unique identifier of the webhook",
              in: "path",
            },
            {
              name: "url",
              type: "string",
              required: false,
              description: "URL to send webhook events to",
              in: "body",
            },
            {
              name: "events",
              type: "array",
              required: false,
              description: "Array of event types to subscribe to",
              in: "body",
              items: {
                type: "string",
                enum: [
                  "wallet.created",
                  "wallet.updated",
                  "wallet.deleted",
                  "transaction.created",
                  "transaction.updated",
                  "transaction.completed",
                  "transaction.failed",
                  "user.updated",
                  "price.alert",
                ],
              },
            },
            {
              name: "status",
              type: "string",
              required: false,
              description: "Status of the webhook (active, paused)",
              in: "body",
            },
            {
              name: "description",
              type: "string",
              required: false,
              description: "Description of the webhook",
              in: "body",
            },
          ],
          responses: {
            "200": {
              description: "Webhook updated successfully",
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  url: { type: "string" },
                  events: {
                    type: "array",
                    items: { type: "string" },
                  },
                  status: { type: "string" },
                  created_at: { type: "string", format: "date-time" },
                  updated_at: { type: "string", format: "date-time" },
                },
              },
            },
            "400": {
              description: "Invalid request",
            },
            "404": {
              description: "Webhook not found",
            },
          },
        },
        {
          id: "delete-webhook",
          name: "Delete Webhook",
          method: "DELETE",
          path: "/v2/webhooks/{webhook_id}",
          description: "Deletes a specific webhook",
          parameters: [
            {
              name: "webhook_id",
              type: "string",
              required: true,
              description: "Unique identifier of the webhook",
              in: "path",
            },
          ],
          responses: {
            "204": {
              description: "Webhook deleted successfully",
            },
            "404": {
              description: "Webhook not found",
            },
          },
        },
      ],
    },
  ];

  // Code examples for different languages
  const codeExamples = {
    javascript: {
      "get-wallets": `// Using the JavaScript SDK
import { DePay } from '@depay/sdk';

const depay = new DePay('YOUR_API_KEY');

async function getWallets() {
  try {
    const response = await depay.wallets.list({
      limit: 10,
      offset: 0,
      sort: 'created_at',
      order: 'desc'
    });
    
    console.log('Wallets:', response.data);
    console.log('Pagination:', response.pagination);
  } catch (error) {
    console.error('Error fetching wallets:', error);
  }
}

getWallets();`,
      "create-wallet": `// Using the JavaScript SDK
import { DePay } from '@depay/sdk';

const depay = new DePay('YOUR_API_KEY');

async function createWallet() {
  try {
    const wallet = await depay.wallets.create({
      name: 'My Bitcoin Wallet',
      type: 'bitcoin'
    });
    
    console.log('New wallet created:', wallet);
    console.log('Wallet address:', wallet.address);
  } catch (error) {
    console.error('Error creating wallet:', error);
  }
}

createWallet();`,
      "get-transactions": `// Using the JavaScript SDK
import { DePay } from '@depay/sdk';

const depay = new DePay('YOUR_API_KEY');

async function getTransactions() {
  try {
    const response = await depay.transactions.list({
      wallet_id: 'wallet_123456789',
      status: 'completed',
      limit: 20,
      from_date: '2023-01-01T00:00:00Z'
    });
    
    console.log('Transactions:', response.data);
    console.log('Pagination:', response.pagination);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

getTransactions();`,
      "create-transaction": `// Using the JavaScript SDK
import { DePay } from '@depay/sdk';

const depay = new DePay('YOUR_API_KEY');

async function sendTransaction() {
  try {
    const transaction = await depay.transactions.create({
      wallet_id: 'wallet_123456789',
      recipient: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      amount: 0.05,
      currency: 'ETH',
      description: 'Payment for services'
    });
    
    console.log('Transaction created:', transaction);
    console.log('Transaction ID:', transaction.id);
    console.log('Status:', transaction.status);
  } catch (error) {
    console.error('Error creating transaction:', error);
  }
}

sendTransaction();`,
      "get-portfolio": `// Using the JavaScript SDK
import { DePay } from '@depay/sdk';

const depay = new DePay('YOUR_API_KEY');

async function getPortfolio() {
  try {
    const portfolio = await depay.analytics.getPortfolio({
      currency: 'USD'
    });
    
    console.log('Total portfolio value:', portfolio.total_value, portfolio.currency);
    console.log('24h change:', portfolio.change_24h_percentage + '%');
    
    // Display asset allocation
    portfolio.assets.forEach(asset => {
      console.log(\`\${asset.name} (\${asset.code}): \${asset.amount} (\${asset.percentage}%)\`);
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
  }
}

getPortfolio();`,
      "create-webhook": `// Using the JavaScript SDK
import { DePay } from '@depay/sdk';

const depay = new DePay('YOUR_API_KEY');

async function createWebhook() {
  try {
    const webhook = await depay.webhooks.create({
      url: 'https://example.com/webhook',
      events: [
        'transaction.created',
        'transaction.completed',
        'wallet.created'
      ],
      description: 'Transaction notifications webhook'
    });
    
    console.log('Webhook created:', webhook);
    console.log('Webhook secret (save this):', webhook.secret);
  } catch (error) {
    console.error('Error creating webhook:', error);
  }
}

createWebhook();`,
    },
    python: {
      "get-wallets": `# Using the Python SDK
from depay import DePay

# Initialize the client
client = DePay(api_key='YOUR_API_KEY')

# Get wallets
try:
    response = client.wallets.list(
        limit=10,
        offset=0,
        sort='created_at',
        order='desc'
    )
    
    print(f"Wallets: {response['data']}")
    print(f"Pagination: {response['pagination']}")
except Exception as e:
    print(f"Error fetching wallets: {e}")`,
      "create-wallet": `# Using the Python SDK
from depay import DePay

# Initialize the client
client = DePay(api_key='YOUR_API_KEY')

# Create a new wallet
try:
    wallet = client.wallets.create(
        name='My Bitcoin Wallet',
        type='bitcoin'
    )
    
    print(f"New wallet created: {wallet}")
    print(f"Wallet address: {wallet['address']}")
except Exception as e:
    print(f"Error creating wallet: {e}")`,
      "get-transactions": `# Using the Python SDK
from depay import DePay
from datetime import datetime, timezone

# Initialize the client
client = DePay(api_key='YOUR_API_KEY')

# Get transactions
try:
    response = client.transactions.list(
        wallet_id='wallet_123456789',
        status='completed',
        limit=20,
        from_date='2023-01-01T00:00:00Z'
    )
    
    print(f"Transactions: {response['data']}")
    print(f"Pagination: {response['pagination']}")
except Exception as e:
    print(f"Error fetching transactions: {e}")`,
      "create-transaction": `# Using the Python SDK
from depay import DePay

# Initialize the client
client = DePay(api_key='YOUR_API_KEY')

# Create a new transaction
try:
    transaction = client.transactions.create(
        wallet_id='wallet_123456789',
        recipient='0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        amount=0.05,
        currency='ETH',
        description='Payment for services'
    )
    
    print(f"Transaction created: {transaction}")
    print(f"Transaction ID: {transaction['id']}")
    print(f"Status: {transaction['status']}")
except Exception as e:
    print(f"Error creating transaction: {e}")`,
      "get-portfolio": `# Using the Python SDK
from depay import DePay

# Initialize the client
client = DePay(api_key='YOUR_API_KEY')

# Get portfolio
try:
    portfolio = client.analytics.get_portfolio(
        currency='USD'
    )
    
    print(f"Total portfolio value: {portfolio['total_value']} {portfolio['currency']}")
    print(f"24h change: {portfolio['change_24h_percentage']}%")
    
    # Display asset allocation
    for asset in portfolio['assets']:
        print(f"{asset['name']} ({asset['code']}): {asset['amount']} ({asset['percentage']}%)")
except Exception as e:
    print(f"Error fetching portfolio: {e}")`,
      "create-webhook": `# Using the Python SDK
from depay import DePay

# Initialize the client
client = DePay(api_key='YOUR_API_KEY')

# Create a new webhook
try:
    webhook = client.webhooks.create(
        url='https://example.com/webhook',
        events=[
            'transaction.created',
            'transaction.completed',
            'wallet.created'
        ],
        description='Transaction notifications webhook'
    )
    
    print(f"Webhook created: {webhook}")
    print(f"Webhook secret (save this): {webhook['secret']}")
except Exception as e:
    print(f"Error creating webhook: {e}")`,
    },
    curl: {
      "get-wallets": `curl -X GET "https://api.depay.com/v2/wallets?limit=10&offset=0&sort=created_at&order=desc" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
      "create-wallet": `curl -X POST "https://api.depay.com/v2/wallets" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Bitcoin Wallet",
    "type": "bitcoin"
  }'`,
      "get-transactions": `curl -X GET "https://api.depay.com/v2/transactions?wallet_id=wallet_123456789&status=completed&limit=20&from_date=2023-01-01T00:00:00Z" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
      "create-transaction": `curl -X POST "https://api.depay.com/v2/transactions" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "wallet_id": "wallet_123456789",
    "recipient": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "amount": 0.05,
    "currency": "ETH",
    "description": "Payment for services"
  }'`,
      "get-portfolio": `curl -X GET "https://api.depay.com/v2/analytics/portfolio?currency=USD" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
      "create-webhook": `curl -X POST "https://api.depay.com/v2/webhooks" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/webhook",
    "events": [
      "transaction.created",
      "transaction.completed",
      "wallet.created"
    ],
    "description": "Transaction notifications webhook"
  }'`,
    },
    ruby: {
      "get-wallets": `# Using the Ruby SDK
require 'depay'

# Initialize the client
client = depay::Client.new(api_key: 'YOUR_API_KEY')

# Get wallets
begin
  response = client.wallets.list(
    limit: 10,
    offset: 0,
    sort: 'created_at',
    order: 'desc'
  )
  
  puts "Wallets: #{response.data}"
  puts "Pagination: #{response.pagination}"
rescue depay::Error => e
  puts "Error fetching wallets: #{e.message}"
end`,
      "create-wallet": `# Using the Ruby SDK
require 'depay'

# Initialize the client
client = depay::Client.new(api_key: 'YOUR_API_KEY')

# Create a new wallet
begin
  wallet = client.wallets.create(
    name: 'My Bitcoin Wallet',
    type: 'bitcoin'
  )
  
  puts "New wallet created: #{wallet}"
  puts "Wallet address: #{wallet.address}"
rescue depay::Error => e
  puts "Error creating wallet: #{e.message}"
end`,
      "get-transactions": `# Using the Ruby SDK
require 'depay'

# Initialize the client
client = depay::Client.new(api_key: 'YOUR_API_KEY')

# Get transactions
begin
  response = client.transactions.list(
    wallet_id: 'wallet_123456789',
    status: 'completed',
    limit: 20,
    from_date: '2023-01-01T00:00:00Z'
  )
  
  puts "Transactions: #{response.data}"
  puts "Pagination: #{response.pagination}"
rescue depay::Error => e
  puts "Error fetching transactions: #{e.message}"
end`,
      "create-transaction": `# Using the Ruby SDK
require 'depay'

# Initialize the client
client = depay::Client.new(api_key: 'YOUR_API_KEY')

# Create a new transaction
begin
  transaction = client.transactions.create(
    wallet_id: 'wallet_123456789',
    recipient: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    amount: 0.05,
    currency: 'ETH',
    description: 'Payment for services'
  )
  
  puts "Transaction created: #{transaction}"
  puts "Transaction ID: #{transaction.id}"
  puts "Status: #{transaction.status}"
rescue depay::Error => e
  puts "Error creating transaction: #{e.message}"
end`,
      "get-portfolio": `# Using the Ruby SDK
require 'depay'

# Initialize the client
client = depay::Client.new(api_key: 'YOUR_API_KEY')

# Get portfolio
begin
  portfolio = client.analytics.get_portfolio(
    currency: 'USD'
  )
  
  puts "Total portfolio value: #{portfolio.total_value} #{portfolio.currency}"
  puts "24h change: #{portfolio.change_24h_percentage}%"
  
  # Display asset allocation
  portfolio.assets.each do |asset|
    puts "#{asset.name} (#{asset.code}): #{asset.amount} (#{asset.percentage}%)"
  end
rescue depay::Error => e
  puts "Error fetching portfolio: #{e.message}"
end`,
      "create-webhook": `# Using the Ruby SDK
require 'depay'

# Initialize the client
client = depay::Client.new(api_key: 'YOUR_API_KEY')

# Create a new webhook
begin
  webhook = client.webhooks.create(
    url: 'https://example.com/webhook',
    events: [
      'transaction.created',
      'transaction.completed',
      'wallet.created'
    ],
    description: 'Transaction notifications webhook'
  )
  
  puts "Webhook created: #{webhook}"
  puts "Webhook secret (save this): #{webhook.secret}"
rescue depay::Error => e
  puts "Error creating webhook: #{e.message}"
end`,
    },
    go: {
      "get-wallets": `// Using the Go SDK
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/depay/depay-go"
)

func main() {
	// Initialize the client
	client := depay.New("YOUR_API_KEY")

	// Get wallets
	params := &depay.WalletListParams{
		Limit:  depay.Int64(10),
		Offset: depay.Int64(0),
		Sort:   depay.String("created_at"),
		Order:  depay.String("desc"),
	}

	response, err := client.Wallets.List(context.Background(), params)
	if err != nil {
		log.Fatalf("Error fetching wallets: %v", err)
	}

	fmt.Printf("Wallets: %+v\n", response.Data)
	fmt.Printf("Pagination: %+v\n", response.Pagination)
}`,
      "create-wallet": `// Using the Go SDK
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/depay/depay-go"
)

func main() {
	// Initialize the client
	client := depay.New("YOUR_API_KEY")

	// Create a new wallet
	params := &depay.WalletCreateParams{
		Name: depay.String("My Bitcoin Wallet"),
		Type: depay.String("bitcoin"),
	}

	wallet, err := client.Wallets.Create(context.Background(), params)
	if err != nil {
		log.Fatalf("Error creating wallet: %v", err)
	}

	fmt.Printf("New wallet created: %+v\n", wallet)
	fmt.Printf("Wallet address: %s\n", wallet.Address)
}`,
      "get-transactions": `// Using the Go SDK
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/depay/depay-go"
)

func main() {
	// Initialize the client
	client := depay.New("YOUR_API_KEY")

	// Get transactions
	params := &depay.TransactionListParams{
		WalletID: depay.String("wallet_123456789"),
		Status:   depay.String("completed"),
		Limit:    depay.Int64(20),
		FromDate: depay.String("2023-01-01T00:00:00Z"),
	}

	response, err := client.Transactions.List(context.Background(), params)
	if err != nil {
		log.Fatalf("Error fetching transactions: %v", err)
	}

	fmt.Printf("Transactions: %+v\n", response.Data)
	fmt.Printf("Pagination: %+v\n", response.Pagination)
}`,
      "create-transaction": `// Using the Go SDK
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/depay/depay-go"
)

func main() {
	// Initialize the client
	client := depay.New("YOUR_API_KEY")

	// Create a new transaction
	params := &depay.TransactionCreateParams{
		WalletID:    depay.String("wallet_123456789"),
		Recipient:   depay.String("0x742d35Cc6634C0532925a3b844Bc454e4438f44e"),
		Amount:      depay.Float64(0.05),
		Currency:    depay.String("ETH"),
		Description: depay.String("Payment for services"),
	}

	transaction, err := client.Transactions.Create(context.Background(), params)
	if err != nil {
		log.Fatalf("Error creating transaction: %v", err)
	}

	fmt.Printf("Transaction created: %+v\n", transaction)
	fmt.Printf("Transaction ID: %s\n", transaction.ID)
	fmt.Printf("Status: %s\n", transaction.Status)
}`,
      "get-portfolio": `// Using the Go SDK
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/depay/depay-go"
)

func main() {
	// Initialize the client
	client := depay.New("YOUR_API_KEY")

	// Get portfolio
	params := &depay.PortfolioParams{
		Currency: depay.String("USD"),
	}

	portfolio, err := client.Analytics.GetPortfolio(context.Background(), params)
	if err != nil {
		log.Fatalf("Error fetching portfolio: %v", err)
	}

	fmt.Printf("Total portfolio value: %f %s\n", portfolio.TotalValue, portfolio.Currency)
	fmt.Printf("24h change: %f%%\n", portfolio.Change24hPercentage)

	// Display asset allocation
	for _, asset := range portfolio.Assets {
		fmt.Printf("%s (%s): %f (%f%%)\n", asset.Name, asset.Code, asset.Amount, asset.Percentage)
	}
}`,
      "create-webhook": `// Using the Go SDK
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/depay/depay-go"
)

func main() {
	// Initialize the client
	client := depay.New("YOUR_API_KEY")

	// Create a new webhook
	params := &depay.WebhookCreateParams{
		URL: depay.String("https://example.com/webhook"),
		Events: &[]string{
			"transaction.created",
			"transaction.completed",
			"wallet.created",
		},
		Description: depay.String("Transaction notifications webhook"),
	}

	webhook, err := client.Webhooks.Create(context.Background(), params)
	if err != nil {
		log.Fatalf("Error creating webhook: %v", err)
	}

	fmt.Printf("Webhook created: %+v\n", webhook)
	fmt.Printf("Webhook secret (save this): %s\n", webhook.Secret)
}`,
    },
  };

  // Find the active endpoint
  const findActiveEndpoint = () => {
    for (const category of endpointCategories) {
      const endpoint = category.endpoints.find((e) => e.id === activeEndpoint);
      if (endpoint) {
        return endpoint;
      }
    }
    return null;
  };

  const currentEndpoint = findActiveEndpoint();

  return (
    <div className="container mt-12 p-16">
      <motion.div
        className="flex flex-col space-y-2 pb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          DePay API Documentation
        </h1>
        <p className="text-muted-foreground">
          Complete reference for the DePay API v2, including endpoints,
          parameters, and examples.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search endpoints..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* API Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>API Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#introduction">
                  <Info className="mr-2 h-4 w-4" />
                  Introduction
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#authentication">
                  <Key className="mr-2 h-4 w-4" />
                  Authentication
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#rate-limits">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Rate Limits
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#errors">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Errors
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#versioning">
                  <Code className="mr-2 h-4 w-4" />
                  Versioning
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#webhooks">
                  <Webhook className="mr-2 h-4 w-4" />
                  Webhooks
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#sdks">
                  <Terminal className="mr-2 h-4 w-4" />
                  SDKs & Libraries
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Endpoints */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Endpoints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <Accordion
                type="multiple"
                className="space-y-2"
              >
                {endpointCategories.map((category) => (
                  <AccordionItem
                    key={category.name.toLowerCase()}
                    value={category.name.toLowerCase()}
                  >
                    <AccordionTrigger className="py-2">
                      <div className="flex items-center">
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-1 pt-1">
                      {filterEndpoints(category.endpoints, searchQuery).map(
                        (endpoint: {
                          id: string;
                          name: string;
                          method: string;
                        }) => (
                          <Button
                            key={endpoint.id}
                            variant={
                              activeEndpoint === endpoint.id
                                ? "secondary"
                                : "ghost"
                            }
                            className="w-full justify-start text-sm h-9"
                            onClick={() => setActiveEndpoint(endpoint.id)}
                          >
                            <Badge
                              variant="outline"
                              className={`mr-2 ${
                                endpoint.method === "GET"
                                  ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                  : endpoint.method === "POST"
                                  ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                                  : endpoint.method === "PATCH" ||
                                    endpoint.method === "PUT"
                                  ? "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
                                  : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                              }`}
                            >
                              {endpoint.method}
                            </Badge>
                            <span className="truncate">{endpoint.name}</span>
                          </Button>
                        )
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="lg:col-span-3 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Introduction Section */}
          {!currentEndpoint && (
            <>
              <Card id="introduction">
                <CardHeader>
                  <CardTitle className="text-2xl">Introduction</CardTitle>
                  <CardDescription>
                    Welcome to the DePay API documentation. Our API enables you
                    to integrate cryptocurrency functionality into your
                    applications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The DePay API is organized around REST. Our API has
                    predictable resource-oriented URLs, accepts form-encoded
                    request bodies, returns JSON-encoded responses, and uses
                    standard HTTP response codes, authentication, and verbs.
                  </p>

                  <div className="p-4 rounded-lg bg-muted">
                    <h3 className="font-medium mb-2">Base URL</h3>
                    <div className="font-mono text-sm">
                      https://api.depay.com
                    </div>
                  </div>

                  <Alert>
                    <Server className="h-4 w-4" />
                    <AlertTitle>API Environments</AlertTitle>
                    <AlertDescription>
                      We provide both production and sandbox environments. Use
                      the sandbox for testing without affecting real data or
                      transactions.
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div>
                          <div className="font-medium">Production</div>
                          <div className="font-mono text-xs">
                            https://api.depay.com
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Sandbox</div>
                          <div className="font-mono text-xs">
                            https://sandbox-api.depay.com
                          </div>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card id="authentication">
                <CardHeader>
                  <CardTitle className="text-2xl">Authentication</CardTitle>
                  <CardDescription>
                    The DePay API uses API keys to authenticate requests.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    You can view and manage your API keys in the{" "}
                    <a
                      href="/dashboard/api"
                      className="text-primary hover:underline"
                    >
                      API dashboard
                    </a>
                    . Your API keys carry many privileges, so be sure to keep
                    them secure. Do not share your API keys in publicly
                    accessible areas such as GitHub, client-side code, etc.
                  </p>

                  <div className="p-4 rounded-lg bg-muted">
                    <h3 className="font-medium mb-2">Authentication Example</h3>
                    <div className="font-mono text-sm">
                      <div>curl https://api.depay.com/v2/wallets \</div>
                      <div>
                        &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY"
                      </div>
                    </div>
                  </div>

                  <Alert className="bg-yellow-500/10 border-yellow-500/30">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <AlertTitle className="text-yellow-500">
                      Security Best Practices
                    </AlertTitle>
                    <AlertDescription className="text-muted-foreground">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Never share your API keys in public repositories or
                          client-side code
                        </li>
                        <li>Rotate your API keys periodically</li>
                        <li>
                          Use different API keys for different environments
                          (development, staging, production)
                        </li>
                        <li>
                          Consider using IP restrictions to limit which IP
                          addresses can use your API keys
                        </li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card id="rate-limits">
                <CardHeader>
                  <CardTitle className="text-2xl">Rate Limits</CardTitle>
                  <CardDescription>
                    The DePay API implements rate limiting to protect our
                    infrastructure and ensure fair usage.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Rate limits vary based on your plan. By default, you can
                    make up to 100 requests per minute. If you exceed this
                    limit, you'll receive a 429 Too Many Requests response.
                  </p>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plan</TableHead>
                        <TableHead>Rate Limit</TableHead>
                        <TableHead>Burst Limit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Free</TableCell>
                        <TableCell>100 requests/minute</TableCell>
                        <TableCell>120 requests/minute</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Standard</TableCell>
                        <TableCell>500 requests/minute</TableCell>
                        <TableCell>600 requests/minute</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Premium</TableCell>
                        <TableCell>2,000 requests/minute</TableCell>
                        <TableCell>2,400 requests/minute</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Enterprise</TableCell>
                        <TableCell>Custom</TableCell>
                        <TableCell>Custom</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="p-4 rounded-lg bg-muted">
                    <h3 className="font-medium mb-2">Rate Limit Headers</h3>
                    <p className="text-sm mb-3">
                      All API responses include headers that indicate your
                      current rate limit status:
                    </p>
                    <div className="space-y-2 font-mono text-xs">
                      <div>
                        <span className="text-primary">X-RateLimit-Limit</span>:
                        Maximum number of requests allowed in the current period
                      </div>
                      <div>
                        <span className="text-primary">
                          X-RateLimit-Remaining
                        </span>
                        : Number of requests remaining in the current period
                      </div>
                      <div>
                        <span className="text-primary">X-RateLimit-Reset</span>:
                        Time at which the current rate limit window resets in
                        UTC epoch seconds
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <RefreshCw className="h-4 w-4" />
                    <AlertTitle>Handling Rate Limits</AlertTitle>
                    <AlertDescription>
                      When you exceed your rate limit, implement exponential
                      backoff with jitter in your client code. This helps
                      prevent thundering herd problems when your rate limit
                      resets.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card id="errors">
                <CardHeader>
                  <CardTitle className="text-2xl">Errors</CardTitle>
                  <CardDescription>
                    The DePay API uses conventional HTTP response codes to
                    indicate the success or failure of an API request.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    In general, codes in the 2xx range indicate success, codes
                    in the 4xx range indicate an error that failed given the
                    information provided (e.g., a required parameter was
                    omitted), and codes in the 5xx range indicate an error with
                    our servers.
                  </p>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>200 - OK</TableCell>
                        <TableCell>Everything worked as expected</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>201 - Created</TableCell>
                        <TableCell>
                          A new resource was successfully created
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>204 - No Content</TableCell>
                        <TableCell>
                          The request was successful but returns no content
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>400 - Bad Request</TableCell>
                        <TableCell>
                          The request was unacceptable, often due to missing a
                          required parameter
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>401 - Unauthorized</TableCell>
                        <TableCell>No valid API key provided</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>402 - Payment Required</TableCell>
                        <TableCell>
                          The parameters were valid but the request failed
                          (e.g., insufficient funds)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>403 - Forbidden</TableCell>
                        <TableCell>
                          The API key doesn't have permissions to perform the
                          request
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>404 - Not Found</TableCell>
                        <TableCell>
                          The requested resource doesn't exist
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>409 - Conflict</TableCell>
                        <TableCell>
                          The request conflicts with another request
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>429 - Too Many Requests</TableCell>
                        <TableCell>
                          Too many requests hit the API too quickly
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          500, 502, 503, 504 - Server Errors
                        </TableCell>
                        <TableCell>Something went wrong on our end</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="p-4 rounded-lg bg-muted">
                    <h3 className="font-medium mb-2">Error Response Format</h3>
                    <div className="font-mono text-sm">
                      <div>&#123;</div>
                      <div>&nbsp;&nbsp;"error": &#123;</div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;"code": "parameter_missing",
                      </div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;"message": "The parameter
                        'amount' is required",
                      </div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;"details": [&#123; "field":
                        "amount", "issue": "required" &#125;]
                      </div>
                      <div>&nbsp;&nbsp;&#125;</div>
                      <div>&#125;</div>
                    </div>
                  </div>

                  <Alert className="bg-blue-500/10 border-blue-500/30">
                    <Info className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="text-blue-500">
                      Error Handling Best Practices
                    </AlertTitle>
                    <AlertDescription className="text-muted-foreground">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Always check the error code and message in your client
                          code
                        </li>
                        <li>
                          Implement proper retry logic for 5xx errors and 429
                          responses
                        </li>
                        <li>
                          Log detailed error information for debugging purposes
                        </li>
                        <li>
                          Present user-friendly error messages to your users
                          based on the error code and message
                        </li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card id="versioning">
                <CardHeader>
                  <CardTitle className="text-2xl">Versioning</CardTitle>
                  <CardDescription>
                    The DePay API is versioned to ensure backward compatibility
                    as we evolve the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The current version is{" "}
                    <code className="text-sm font-mono">v2</code>. The version
                    is included in the URL path, e.g.,{" "}
                    <code className="text-sm font-mono">/v2/wallets</code>.
                  </p>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Version Support Policy</AlertTitle>
                    <AlertDescription>
                      <p className="mb-2">
                        We maintain support for API versions according to the
                        following schedule:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <strong>Active versions</strong> (v2): Fully supported
                          with new features and bug fixes
                        </li>
                        <li>
                          <strong>Deprecated versions</strong> (v1): Security
                          fixes only, no new features
                        </li>
                        <li>
                          <strong>Sunset versions</strong>: No longer supported
                          and will return 410 Gone responses
                        </li>
                      </ul>
                      <p className="mt-2">
                        We provide at least 6 months notice before sunsetting an
                        API version.
                      </p>
                    </AlertDescription>
                  </Alert>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Version</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Released</TableHead>
                        <TableHead>End of Life</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>v3 (Beta)</TableCell>
                        <TableCell>
                          <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">
                            Beta
                          </Badge>
                        </TableCell>
                        <TableCell>March 2023</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>v2</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>January 2022</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>v1</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
                            Deprecated
                          </Badge>
                        </TableCell>
                        <TableCell>June 2020</TableCell>
                        <TableCell>December 2023</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card id="webhooks">
                <CardHeader>
                  <CardTitle className="text-2xl">Webhooks</CardTitle>
                  <CardDescription>
                    Webhooks allow you to receive real-time notifications when
                    events happen in your DePay account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Instead of polling our API for changes, webhooks push data
                    to your server as events occur. This is particularly useful
                    for events like transaction status changes, wallet updates,
                    and price alerts.
                  </p>

                  <div className="p-4 rounded-lg bg-muted">
                    <h3 className="font-medium mb-2">Webhook Event Types</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <div className="font-medium text-sm">Wallet Events</div>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>wallet.created</li>
                          <li>wallet.updated</li>
                          <li>wallet.deleted</li>
                        </ul>
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">
                          Transaction Events
                        </div>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>transaction.created</li>
                          <li>transaction.updated</li>
                          <li>transaction.completed</li>
                          <li>transaction.failed</li>
                        </ul>
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">User Events</div>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>user.updated</li>
                          <li>user.verification.updated</li>
                        </ul>
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">Price Events</div>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>price.alert</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Webhook Payload Example</h3>
                    <div className="p-4 rounded-lg bg-muted font-mono text-sm">
                      <div>&#123;</div>
                      <div>&nbsp;&nbsp;"id": "evt_1234567890",</div>
                      <div>&nbsp;&nbsp;"type": "transaction.completed",</div>
                      <div>
                        &nbsp;&nbsp;"created_at": "2023-05-15T14:23:45Z",
                      </div>
                      <div>&nbsp;&nbsp;"data": &#123;</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;"id": "txn_abcdefghij",</div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;"wallet_id": "wallet_123456789",
                      </div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;"type": "send",</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;"status": "completed",</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;"amount": 0.05,</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;"fee": 0.0001,</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;"currency": "ETH",</div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;"recipient":
                        "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                      </div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;"transaction_hash":
                        "0x1234567890abcdef...",
                      </div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;"created_at":
                        "2023-05-15T14:20:10Z",
                      </div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;"updated_at":
                        "2023-05-15T14:23:45Z"
                      </div>
                      <div>&nbsp;&nbsp;&#125;</div>
                      <div>&#125;</div>
                    </div>
                  </div>

                  <Alert>
                    <Webhook className="h-4 w-4" />
                    <AlertTitle>Webhook Security</AlertTitle>
                    <AlertDescription>
                      <p className="mb-2">
                        To verify that webhook requests are coming from DePay,
                        we include a signature in the
                        <code className="text-sm font-mono mx-1">
                          X-depay-Signature
                        </code>{" "}
                        header.
                      </p>
                      <div className="p-3 rounded-lg bg-muted/50 font-mono text-xs mt-2">
                        <div>// Verify webhook signature (Node.js example)</div>
                        <div>const crypto = require('crypto');</div>
                        <div>
                          const signature = req.headers['x-depay-signature'];
                        </div>
                        <div>
                          const payload = req.rawBody; // Raw request body
                        </div>
                        <div>const secret = 'whsec_...';</div>
                        <div>
                          const hmac = crypto.createHmac('sha256',
                          secret).update(payload).digest('hex');
                        </div>
                        <div>const isValid = crypto.timingSafeEqual(</div>
                        <div>&nbsp;&nbsp;Buffer.from(hmac),</div>
                        <div>&nbsp;&nbsp;Buffer.from(signature)</div>
                        <div>);</div>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <h3 className="font-medium">Webhook Best Practices</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Always verify the webhook signature to ensure the
                        request is from DePay
                      </li>
                      <li>
                        Respond to webhook requests quickly (within 5 seconds)
                        to avoid timeouts
                      </li>
                      <li>
                        Implement idempotency to handle duplicate webhook
                        deliveries
                      </li>
                      <li>
                        Use the webhook dashboard to monitor delivery status and
                        retry failed webhooks
                      </li>
                      <li>
                        Implement a retry mechanism in your webhook handler for
                        transient errors
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card id="sdks">
                <CardHeader>
                  <CardTitle className="text-2xl">SDKs & Libraries</CardTitle>
                  <CardDescription>
                    We provide official client libraries for several programming
                    languages to make integrating with our API easier.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center mb-2">
                        <Terminal className="h-5 w-5 text-primary mr-2" />
                        <h3 className="font-medium">JavaScript/TypeScript</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Official JavaScript/TypeScript SDK with full TypeScript
                        typings
                      </p>
                      <div className="p-2 rounded bg-muted font-mono text-xs mb-3">
                        npm install @depay/sdk
                      </div>
                      <div className="flex items-center text-sm">
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          <Book className="h-3.5 w-3.5 mr-1" />
                          Documentation
                        </a>
                        <span className="mx-2">•</span>
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          GitHub
                        </a>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center mb-2">
                        <Terminal className="h-5 w-5 text-primary mr-2" />
                        <h3 className="font-medium">Python</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Official Python SDK with async support
                      </p>
                      <div className="p-2 rounded bg-muted font-mono text-xs mb-3">
                        pip install depay
                      </div>
                      <div className="flex items-center text-sm">
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          <Book className="h-3.5 w-3.5 mr-1" />
                          Documentation
                        </a>
                        <span className="mx-2">•</span>
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          GitHub
                        </a>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center mb-2">
                        <Terminal className="h-5 w-5 text-primary mr-2" />
                        <h3 className="font-medium">Ruby</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Official Ruby SDK with Rails integration
                      </p>
                      <div className="p-2 rounded bg-muted font-mono text-xs mb-3">
                        gem install depay
                      </div>
                      <div className="flex items-center text-sm">
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          <Book className="h-3.5 w-3.5 mr-1" />
                          Documentation
                        </a>
                        <span className="mx-2">•</span>
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          GitHub
                        </a>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center mb-2">
                        <Terminal className="h-5 w-5 text-primary mr-2" />
                        <h3 className="font-medium">Go</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Official Go SDK with context support
                      </p>
                      <div className="p-2 rounded bg-muted font-mono text-xs mb-3">
                        go get github.com/depay/depay-go
                      </div>
                      <div className="flex items-center text-sm">
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          <Book className="h-3.5 w-3.5 mr-1" />
                          Documentation
                        </a>
                        <span className="mx-2">•</span>
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          GitHub
                        </a>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center mb-2">
                        <Terminal className="h-5 w-5 text-primary mr-2" />
                        <h3 className="font-medium">PHP</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Official PHP SDK with Laravel integration
                      </p>
                      <div className="p-2 rounded bg-muted font-mono text-xs mb-3">
                        composer require depay/depay-php
                      </div>
                      <div className="flex items-center text-sm">
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          <Book className="h-3.5 w-3.5 mr-1" />
                          Documentation
                        </a>
                        <span className="mx-2">•</span>
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          GitHub
                        </a>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center mb-2">
                        <Terminal className="h-5 w-5 text-primary mr-2" />
                        <h3 className="font-medium">Java</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Official Java SDK with Spring integration
                      </p>
                      <div className="p-2 rounded bg-muted font-mono text-xs mb-3">
                        {
                          "<dependency>\n  <groupId>com.depay</groupId>\n  <artifactId>depay-java</artifactId>\n  <version>2.0.0</version>\n</dependency>"
                        }
                      </div>
                      <div className="flex items-center text-sm">
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          <Book className="h-3.5 w-3.5 mr-1" />
                          Documentation
                        </a>
                        <span className="mx-2">•</span>
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>

                  <Alert className="bg-blue-500/10 border-blue-500/30">
                    <Info className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="text-blue-500">
                      Community Libraries
                    </AlertTitle>
                    <AlertDescription className="text-muted-foreground">
                      <p className="mb-2">
                        In addition to our official SDKs, there are several
                        community-maintained libraries available:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <a href="#" className="text-primary hover:underline">
                            depay-dotnet
                          </a>{" "}
                          - .NET SDK for DePay
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline">
                            depay-swift
                          </a>{" "}
                          - Swift SDK for iOS and macOS
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline">
                            depay-rust
                          </a>{" "}
                          - Rust SDK for DePay
                        </li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </>
          )}

          {/* Endpoint Documentation */}
          {currentEndpoint && (
            <Card>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`${
                        currentEndpoint.method === "GET"
                          ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                          : currentEndpoint.method === "POST"
                          ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                          : currentEndpoint.method === "PATCH" ||
                            currentEndpoint.method === "PUT"
                          ? "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
                          : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      }`}
                    >
                      {currentEndpoint.method}
                    </Badge>
                    <CardTitle className="text-xl">
                      {currentEndpoint.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-1.5">
                    {currentEndpoint.description}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() => setActiveEndpoint("")}
                >
                  Back to Overview
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-muted">
                  <h3 className="font-medium mb-2">Endpoint</h3>
                  <div className="font-mono text-sm">
                    {currentEndpoint.path}
                  </div>
                </div>

                {/* Parameters */}
                {currentEndpoint.parameters &&
                  currentEndpoint.parameters.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-medium">Parameters</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Required</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentEndpoint.parameters.map((param, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-mono text-xs">
                                {param.name}
                              </TableCell>
                              <TableCell>{param.type}</TableCell>
                              <TableCell>
                                {param.required ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-red-500/10 text-red-500"
                                  >
                                    Required
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="bg-gray-500/10 text-gray-500"
                                  >
                                    Optional
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-sm">
                                {param.description}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                {/* Response */}
                {currentEndpoint.responses &&
                  Object.keys(currentEndpoint.responses).length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-medium">Responses</h3>
                      <Accordion type="single" collapsible className="w-full">
                        {Object.entries(currentEndpoint.responses).map(
                          ([code, response]) => (
                            <AccordionItem key={code} value={code}>
                              <AccordionTrigger className="py-2">
                                <div className="flex items-center">
                                  <Badge
                                    variant="outline"
                                    className={`mr-2 ${
                                      code.startsWith("2")
                                        ? "bg-green-500/10 text-green-500"
                                        : code.startsWith("4")
                                        ? "bg-yellow-500/10 text-yellow-500"
                                        : "bg-red-500/10 text-red-500"
                                    }`}
                                  >
                                    {code}
                                  </Badge>
                                  <span>{response.description}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-2">
                                {response.schema && (
                                  <div className="p-4 rounded-lg bg-muted font-mono text-xs overflow-auto max-h-96">
                                    <pre>
                                      {JSON.stringify(response.schema, null, 2)}
                                    </pre>
                                  </div>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          )
                        )}
                      </Accordion>
                    </div>
                  )}

                {/* Code Examples */}
                <div className="space-y-3">
                  <h3 className="font-medium">Code Examples</h3>
                  <Tabs
                    defaultValue="javascript"
                    onValueChange={setSelectedLanguage}
                  >
                    <TabsList className="w-full justify-start">
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                      <TabsTrigger value="ruby">Ruby</TabsTrigger>
                      <TabsTrigger value="go">Go</TabsTrigger>
                    </TabsList>
                    <TabsContent value={selectedLanguage} className="mt-3">
                      <div className="relative">
                        <div className="absolute top-2 right-2 z-10">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() =>
                                    copyToClipboard(
                                      codeExamples[
                                        selectedLanguage as keyof typeof codeExamples
                                      ]?.[
                                        currentEndpoint.id as keyof (typeof codeExamples)[keyof typeof codeExamples]
                                      ],
                                      currentEndpoint.id
                                    )
                                  }
                                >
                                  {copiedText === currentEndpoint.id ? (
                                    <Check className="h-3.5 w-3.5" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {copiedText === currentEndpoint.id
                                    ? "Copied!"
                                    : "Copy to clipboard"}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="p-4 rounded-lg bg-muted font-mono text-xs overflow-auto max-h-96">
                          <pre className="whitespace-pre-wrap">
                            {
                              codeExamples[
                                selectedLanguage as keyof typeof codeExamples
                              ]?.[
                                currentEndpoint.id as keyof (typeof codeExamples)[keyof typeof codeExamples]
                              ]
                            }
                          </pre>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Try It Out */}
                <div className="space-y-3">
                  <h3 className="font-medium">Try It Out</h3>
                  <div className="p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                      Test this endpoint directly from your browser. Enter your
                      API key and parameters below.
                    </p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">API Key</label>
                        <Input type="password" placeholder="sk_live_..." />
                      </div>

                      {currentEndpoint.parameters &&
                        currentEndpoint.parameters.length > 0 && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Parameters
                            </label>
                            <div className="space-y-2">
                              {currentEndpoint.parameters.map(
                                (param, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <div className="w-1/3">
                                      <label className="text-xs font-medium">
                                        {param.name}
                                      </label>
                                      {param.required && (
                                        <span className="text-red-500 ml-1">
                                          *
                                        </span>
                                      )}
                                    </div>
                                    <Input
                                      type="text"
                                      placeholder={`${param.type} ${
                                        param.required
                                          ? "(required)"
                                          : "(optional)"
                                      }`}
                                      className="w-2/3"
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      <Button className="w-full">
                        <FileJson className="mr-2 h-4 w-4" />
                        Send Request
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" size="sm" className="gap-1">
                  <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  Next
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
