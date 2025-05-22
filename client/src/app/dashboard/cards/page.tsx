"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, Plus, Settings } from "lucide-react";

import { AddCardModal } from "@/components/add-card-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for cards
const initialCards = [
  {
    id: 1,
    name: "Main Debit Card",
    number: "•••• •••• •••• 4582",
    expiryDate: "05/25",
    type: "Visa",
    color: "from-slate-700 to-slate-900",
    balance: 4750.85,
    isActive: true,
    isVirtual: false,
    isFreezed: false,
  },
  {
    id: 2,
    name: "Travel Card",
    number: "•••• •••• •••• 7891",
    expiryDate: "09/26",
    type: "Mastercard",
    color: "from-indigo-700 to-indigo-900",
    balance: 1250.42,
    isActive: true,
    isVirtual: false,
    isFreezed: false,
  },
  {
    id: 3,
    name: "Online Shopping",
    number: "•••• •••• •••• 3214",
    expiryDate: "11/24",
    type: "Visa",
    color: "from-emerald-700 to-emerald-900",
    balance: 820.15,
    isActive: true,
    isVirtual: true,
    isFreezed: false,
  },
];

export default function CardsPage() {
  const [cards, setCards] = useState(initialCards);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  const toggleCardFreeze = (cardId: number) => {
    setCards(
      cards.map((card) =>
        card.id === cardId ? { ...card, isFreezed: !card.isFreezed } : card
      )
    );
  };

  const handleAddCard = (newCard: any) => {
    setCards([...cards, newCard]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cards</h1>
          <p className="text-muted-foreground">Manage your payment cards</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddCardModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Card
          </Button>
        </div>
      </div>

      <Tabs defaultValue="physical" className="space-y-4">
        <TabsList>
          <TabsTrigger value="physical">Physical Cards</TabsTrigger>
          <TabsTrigger value="virtual">Virtual Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="physical" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards
              .filter((card) => !card.isVirtual)
              .map((card) => (
                <Card key={card.id} className="overflow-hidden">
                  <div
                    className={`relative p-6 bg-gradient-to-r ${card.color}`}
                  >
                    <div className="flex flex-col h-48 justify-between text-white">
                      <div className="flex justify-between items-start">
                        <CreditCard className="h-8 w-8" />
                        <span className="text-sm font-light">{card.type}</span>
                      </div>

                      <div className="space-y-4">
                        <div className="text-xl font-mono">{card.number}</div>

                        <div className="flex justify-between">
                          <div>
                            <div className="text-xs opacity-80">
                              CARD HOLDER
                            </div>
                            <div>Alex Johnson</div>
                          </div>
                          <div>
                            <div className="text-xs opacity-80">EXPIRES</div>
                            <div>{card.expiryDate}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {card.isFreezed && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <p className="text-white font-bold text-lg">
                          CARD FROZEN
                        </p>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{card.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Balance: ${card.balance.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {card.isFreezed ? "Frozen" : "Active"}
                        </span>
                        <Switch
                          checked={!card.isFreezed}
                          onCheckedChange={() => toggleCardFreeze(card.id)}
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between border-t p-4">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/cards/${card.id}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/cards/${card.id}/settings`}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}

            <Card
              className="flex items-center justify-center h-[400px] border-dashed cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setIsAddCardModalOpen(true)}
            >
              <CardContent className="flex flex-col items-center p-6">
                <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Add New Physical Card</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="virtual" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards
              .filter((card) => card.isVirtual)
              .map((card) => (
                <Card key={card.id} className="overflow-hidden">
                  <div
                    className={`relative p-6 bg-gradient-to-r ${card.color}`}
                  >
                    <div className="flex flex-col h-48 justify-between text-white">
                      <div className="flex justify-between items-start">
                        <CreditCard className="h-8 w-8" />
                        <span className="text-sm font-light">
                          {card.type} Virtual
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="text-xl font-mono">{card.number}</div>

                        <div className="flex justify-between">
                          <div>
                            <div className="text-xs opacity-80">
                              CARD HOLDER
                            </div>
                            <div>Alex Johnson</div>
                          </div>
                          <div>
                            <div className="text-xs opacity-80">EXPIRES</div>
                            <div>{card.expiryDate}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {card.isFreezed && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <p className="text-white font-bold text-lg">
                          CARD FROZEN
                        </p>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{card.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Balance: ${card.balance.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {card.isFreezed ? "Frozen" : "Active"}
                        </span>
                        <Switch
                          checked={!card.isFreezed}
                          onCheckedChange={() => toggleCardFreeze(card.id)}
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between border-t p-4">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/cards/${card.id}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/cards/${card.id}/settings`}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}

            <Card
              className="flex items-center justify-center h-[400px] border-dashed cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setIsAddCardModalOpen(true)}
            >
              <CardContent className="flex flex-col items-center p-6">
                <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Add New Virtual Card</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AddCardModal
        open={isAddCardModalOpen}
        onOpenChange={setIsAddCardModalOpen}
        onAddCard={handleAddCard}
      />
    </div>
  );
}
