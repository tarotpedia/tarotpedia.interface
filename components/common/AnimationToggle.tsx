'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { useAnimations } from '@/context/AnimationContext';

import { Settings } from 'lucide-react';

export function AnimationToggle() {
  const { animationsEnabled, toggleAnimations } = useAnimations();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#c19670] hover:text-[#d4a574] hover:bg-[#c19670]/10 transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-[#0f0e0f] border-[#c19670]/30">
        <div className="space-y-4">
          <h4 className="text-sm text-[#c19670]">Settings</h4>
          <div className="flex items-center justify-between">
            <Label htmlFor="animations-toggle" className="text-[#c3beb6] cursor-pointer">
              Form Animations
            </Label>
            <Switch
              id="animations-toggle"
              checked={animationsEnabled}
              onCheckedChange={toggleAnimations}
              className="data-[state=checked]:bg-[#c19670] data-[state=unchecked]:bg-[#3d3a2a] data-[state=unchecked]:border-[#8a8580]"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
