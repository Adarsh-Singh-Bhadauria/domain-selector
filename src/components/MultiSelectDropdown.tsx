import React, { useState } from 'react';
import SuggestionsList from './SuggestionsList';
import { FaCopy } from "react-icons/fa";

interface Domain {
    name: string;
    available: boolean;
}

const SelectedItem: React.FC<{ domain: Domain; onRemove: (name: string) => void }> = ({ domain, onRemove }) => (
    <div className="text-gray-500 flex items-center bg-gray-200 rounded px-2 py-1">
        {domain.name}
        <button className="ml-2 text-gray-500 px-2 rounded hover:bg-gray-300" onClick={() => onRemove(domain.name)}>✖</button>
    </div>
);

const DomainInput: React.FC<{ 
    inputValue: string; 
    setInputValue: (value: string) => void; 
    onFocus: () => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
    onClear: () => void;
    hasDomains: boolean;
}> = ({ inputValue, setInputValue, onFocus, onKeyDown, onClear, hasDomains }) => (
    <div className="relative w-full flex items-center">
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            className="text-black w-full px-3 py-2 border rounded-lg"
            placeholder="Select..."
        />
        {hasDomains && (
            <button 
                onClick={onClear} 
                className="text-2xl px-2 absolute right-2 text-red-500 rounded hover:bg-red-200"
            >
                ×
            </button>
        )}
    </div>
);

const DomainList: React.FC<{ domains: Domain[]; onRemove: (name: string) => void; onCopy: () => void; }> = ({ domains, onRemove, onCopy }) => (
    <div className="flex flex-wrap gap-2 mb-2 items-center">
        {domains.map((domain, index) => (
            <SelectedItem key={index} domain={domain} onRemove={onRemove} />
        ))}
        {domains.length > 0 && (
            <button
                onClick={onCopy}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-2"
            >
                <FaCopy/>
            </button>
        )}
    </div>
);

const MultiSelectDropdown: React.FC = () => {
    const [domains, setDomains] = useState<Domain[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions] = useState([
        "NovaPulse.com", "BrightNest.com", "CloudEcho.com", "PixelNest.com", "SwiftOrbit.com",
        "BlueWave.com", "DataCrest.com", "EchoBloom.com", "ZenSphere.com", "PrimeLink.com",
        "CoreFlex.xyz", "TechNova.xyz", "FusionArc.xyz", "AlphaByte.xyz", "NeonFlow.xyz",
        "InfinityGrid.xyz", "HyperNexus.xyz", "NextGen.xyz", "QuantumPixel.xyz", "VortexLab.xyz",
        "LaunchLine.app", "TrackMate.app", "FocusSphere.app", "MindFlow.app", "SnapBase.app",
        "ClickNest.app", "BrightTask.app", "ZenLaunch.app", "DataWave.app", "TaskZen.app"
    ]);
    const [isFocused, setIsFocused] = useState(false); 
    const [activeIndex, setActiveIndex] = useState<number>(0); 

    const filteredSuggestions = suggestions.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
    );

    const handleAddDomain = (index: number) => {
        const selectedDomain = filteredSuggestions[index];
        if (!domains.some(domain => domain.name === selectedDomain)) {
            setDomains([...domains, { name: selectedDomain, available: true }]);
            setInputValue('');
            setActiveIndex(0);
        }
    };

    const handleRemoveDomain = (name: string) => {
        setDomains(domains.filter(domain => domain.name !== name));
    };

    const handleClearCart = () => {
        setDomains([]);
    };

    const handleFocus = () => setIsFocused(true);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case "ArrowDown":
                setActiveIndex((prev) => Math.min(prev + 1, filteredSuggestions.length - 1));
                break;
            case "ArrowUp":
                setActiveIndex((prev) => Math.max(prev - 1, 0));
                break;
            case "Enter":
                e.preventDefault();
                handleAddDomain(activeIndex);
                break;
            case "Escape":
                setIsFocused(false);
                break;
        }
    };

    const handleCopyDomains = () => {
        const domainNames = domains.map((domain) => domain.name).join(', ');
        navigator.clipboard.writeText(domainNames).then(() => {
            alert('Domains copied to clipboard!');
        }).catch((err) => {
            console.error('Error copying to clipboard', err);
        });
    };

    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl p-4 m-4 bg-white border rounded-lg shadow-md">
            <DomainList domains={domains} onRemove={handleRemoveDomain} onCopy={handleCopyDomains} />
            <DomainInput 
                inputValue={inputValue} 
                setInputValue={setInputValue} 
                onFocus={handleFocus} 
                onKeyDown={handleKeyDown} 
                onClear={handleClearCart}
                hasDomains={domains.length > 0}
            />
            {isFocused && filteredSuggestions.length > 0 && (
                <SuggestionsList
                    suggestions={filteredSuggestions}
                    onSelect={handleAddDomain}
                    activeIndex={activeIndex}
                />
            )}
        </div>
      </div>
    );
};

export default MultiSelectDropdown;