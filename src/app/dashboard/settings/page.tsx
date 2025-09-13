import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and data.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automatic Backup</CardTitle>
          <CardDescription>
            Schedule automatic encrypted local backups of your app data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="backup-switch" className="cursor-pointer">
                Enable Automatic Backups
              </Label>
              <p className="text-sm text-muted-foreground">
                Your data will be backed up automatically based on your
                schedule.
              </p>
            </div>
            <Switch id="backup-switch" defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="backup-frequency">Backup Frequency</Label>
            <Select defaultValue="daily">
              <SelectTrigger id="backup-frequency" className="w-[280px]">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="backup-location">Backup Location</Label>
            <div className="flex gap-2">
              <Input
                id="backup-location"
                defaultValue="/Users/YourUser/Documents/SentinelShieldBackups"
                readOnly
              />
              <Button variant="outline">Choose...</Button>
            </div>
          </div>
          <Button>Backup Now</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            These actions are permanent and cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">Secure Data Deletion</h4>
            <p className="mb-2 text-sm text-muted-foreground">
              Securely delete all your data with multiple overwrites to prevent
              recovery. This will permanently erase all passwords, notes, and
              lists.
            </p>
            <Button variant="destructive">Delete All Data</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
