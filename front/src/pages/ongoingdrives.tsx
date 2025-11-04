import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function Ongoingdrives() {
  const [cards] = useState([
  { Title: "Hepatitis B", Description: "Engerix-B", Footer: "Vaccine C", Action: "alert('Card clicked')" },
  { Title: "Tetanus", Description: "TT Injection", Footer: "Vaccine D", Action: "alert('Card clicked')" },
  { Title: "Influenza", Description: "FluShield", Footer: "Vaccine E", Action: "alert('Card clicked')" },
  { Title: "Measles", Description: "Rouvax", Footer: "Vaccine F", Action: "alert('Card clicked')" },
  { Title: "Mumps", Description: "MMR Vaccine", Footer: "Vaccine G", Action: "alert('Card clicked')" },
  { Title: "Rubella", Description: "R-Vax", Footer: "Vaccine H", Action: "alert('Card clicked')" },
  { Title: "Chickenpox", Description: "Varilrix", Footer: "Vaccine I", Action: "alert('Card clicked')" },
  { Title: "HPV", Description: "Cervarix", Footer: "Vaccine J", Action: "alert('Card clicked')" },
  { Title: "Diphtheria", Description: "DTP Vaccine", Footer: "Vaccine K", Action: "alert('Card clicked')" },
  { Title: "Typhoid", Description: "Typhim Vi", Footer: "Vaccine L", Action: "alert('Card clicked')" }
]
);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cards.map((card, index) => (
        <Card key={index} className="shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{card.Title}</CardTitle>
            <CardDescription className="text-gray-600">{card.Description}</CardDescription>
            <CardAction>
              <button
                onClick={() => eval(card.Action)} 
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
              >
                Action
              </button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>More information about {card.Title} can go here.</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">{card.Footer}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

