"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Settings, Loader2 } from "lucide-react"
import type { App } from "@/lib/types"

interface InstallationWizardProps {
  app: App | null
  isOpen: boolean
  onClose: () => void
  onComplete: (appId: string, config: Record<string, any>) => void
}

export function InstallationWizard({ app, isOpen, onClose, onComplete }: InstallationWizardProps) {
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState<Record<string, any>>({})
  const [installing, setInstalling] = useState(false)

  if (!app) return null

  const handleConfigChange = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const handleInstall = async () => {
    setInstalling(true)
    setStep(3)

    // Simulate installation process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onComplete(app.id, config)
    setInstalling(false)
    setStep(1)
    setConfig({})
    onClose()
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-[#0b2a4a] to-[#1ad1ff] flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Configure {app.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">Set up your app preferences before installation</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="app-name">App Instance Name</Label>
                <Input
                  id="app-name"
                  value={config.instanceName || app.name}
                  onChange={(e) => handleConfigChange("instanceName", e.target.value)}
                  placeholder={app.name}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={config.description || ""}
                  onChange={(e) => handleConfigChange("description", e.target.value)}
                  placeholder="Describe how you'll use this app..."
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about app activities</p>
                </div>
                <Switch
                  checked={config.notifications || false}
                  onCheckedChange={(checked) => handleConfigChange("notifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-sync Data</Label>
                  <p className="text-sm text-muted-foreground">Automatically sync with external services</p>
                </div>
                <Switch
                  checked={config.autoSync || false}
                  onCheckedChange={(checked) => handleConfigChange("autoSync", checked)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={() => setStep(2)} className="flex-1 bg-[#0b2a4a] hover:bg-[#0b2a4a]/90">
                Continue
              </Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Review Installation</h3>
              <p className="text-sm text-muted-foreground mt-1">Please review your configuration before installing</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Installation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">App:</span>
                  <span className="text-sm font-medium">{app.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Version:</span>
                  <span className="text-sm font-medium">{app.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Instance Name:</span>
                  <span className="text-sm font-medium">{config.instanceName || app.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Notifications:</span>
                  <span className="text-sm font-medium">{config.notifications ? "Enabled" : "Disabled"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Auto-sync:</span>
                  <span className="text-sm font-medium">{config.autoSync ? "Enabled" : "Disabled"}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleInstall} className="flex-1 bg-[#0b2a4a] hover:bg-[#0b2a4a]/90">
                Install App
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 text-center">
            {installing ? (
              <>
                <div className="mx-auto">
                  <Loader2 className="h-16 w-16 animate-spin text-[#1ad1ff]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Installing {app.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Please wait while we set up your app...</p>
                </div>
                <Progress value={75} className="w-full" />
              </>
            ) : (
              <>
                <div className="mx-auto">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Installation Complete!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {app.name} has been successfully installed and configured.
                  </p>
                </div>
              </>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Install {app.name}</DialogTitle>
          <DialogDescription>Step {step} of 3</DialogDescription>
        </DialogHeader>
        {renderStep()}
      </DialogContent>
    </Dialog>
  )
}
