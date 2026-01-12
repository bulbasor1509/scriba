import { Bookmark } from "lucide-react";
import Wrapper from "./Wrapper";

const TopPicks = () => {
    return (
        <div className="hidden md:flex md:flex-col border-l border-gray-100 h-full">
            <div className="p-8 flex flex-col h-full">
                <div className="capitalize font-bold text-lg">top picks</div>
                <div className="grid grid-cols-1 gap-4 mt-4 capitalize font-semibold">
                    <div>top 10 ui designs idea</div>
                    <div>
                        5 Vanilla JS Patterns That Replace Entire Libraries
                    </div>
                </div>

                <div className="mt-auto class text-sm text-gray-500">
                    Click on any story <Bookmark size={16} className="inline"/> to easily add it to your reading.
                </div>
            </div>
        </div>
    );
};

export default TopPicks;
