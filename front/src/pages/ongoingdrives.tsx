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
    { Title: "Covid-19", Description: "Covishield", Footer: "Vaccine A", Action: "alert('Card clicked')" }
  ]);

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

