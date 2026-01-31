import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Settings, 
  Users, 
  Calendar, 
  Save, 
  Plus, 
  Trash2, 
  Upload,
  Mail,
  ChevronDown,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

const LEADERSHIP_POSITIONS = [
  { key: 'president', role: 'President', order: 1 },
  { key: 'vice_president', role: 'Vice President', order: 2 },
  { key: 'secretary', role: 'Secretary', order: 3 },
  { key: 'treasurer', role: 'Treasurer', order: 4 },
  { key: 'social_media', role: 'Social Media Manager', order: 5 },
  { key: 'events_coordinator', role: 'Events Coordinator', order: 6 },
];

const Admin = () => {
  const { isAdmin, isLoadingAuth, user } = useAuth();

  useEffect(() => {
    if (!isLoadingAuth) {
      // allow access if verified admin OR if the remembered admin uid matches the signed-in user
      let allow = false;
      try {
        const stored = typeof window !== 'undefined' ? window.localStorage.getItem('mckayyaf_admin_uid') : null;
        if (isAdmin) allow = true;
        if (!allow && stored && user && user.uid === stored) allow = true;
      } catch (e) {
        // ignore
      }
      if (!allow) {
        window.location.href = '/';
      }
    }
  }, [isAdmin, isLoadingAuth, user]);
  const [settings, setSettings] = useState({
    active_members: '',
    events_this_year: '',
    guest_speakers: '',
    year_founded: '',
    mission_text: '',
    vision_text: '',
    values_text: '',
    privacy_policy: '',
  });
  const [settingsId, setSettingsId] = useState(null);
  const [events, setEvents] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);
  const [saving, setSaving] = useState(false);
  const [expandedPositions, setExpandedPositions] = useState({});
  const [newEvent, setNewEvent] = useState({
    title: '', description: '', date: '', time: '', location: '', category: 'Meeting', image_url: '', attendees: 0
  });
  const eventFileInputRef = useRef(null);
  const [newContact, setNewContact] = useState({
    type: 'email', title: '', details: '', description: '', href: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [settingsData, eventsData, teamData, contactData] = await Promise.all([
      base44.entities.SiteSettings.list(),
      base44.entities.Event.list('-date'),
      base44.entities.TeamMember.list('order'),
      base44.entities.ContactInfo.list(),
    ]);

    if (settingsData.length > 0) {
      setSettings(settingsData[0]);
      setSettingsId(settingsData[0].id);
    }
    setEvents(eventsData);
    setTeamMembers(teamData);
    setContactInfo(contactData);
  };

  const saveSettings = async () => {
    setSaving(true);
    if (settingsId) {
      await base44.entities.SiteSettings.update(settingsId, settings);
    } else {
      const result = await base44.entities.SiteSettings.create(settings);
      setSettingsId(result.id);
    }
    setSaving(false);
    toast.success('Settings saved!');
  };

  const addEvent = async () => {
    if (!newEvent.title || !newEvent.date) {
      toast.error('Please fill in title and date');
      return;
    }
    await base44.entities.Event.create(newEvent);
    setNewEvent({ title: '', description: '', date: '', time: '', location: '', category: 'Meeting', image_url: '', attendees: 0 });
    loadData();
    toast.success('Event added!');
  };

  const deleteEvent = async (id) => {
    await base44.entities.Event.delete(id);
    loadData();
    toast.success('Event deleted!');
  };

  const getTeamMemberByPosition = (positionKey) => {
    return teamMembers.find(m => m.position_key === positionKey) || null;
  };

  const saveTeamMember = async (positionKey, data) => {
    const existing = getTeamMemberByPosition(positionKey);
    const position = LEADERSHIP_POSITIONS.find(p => p.key === positionKey);
    
    const memberData = {
      ...data,
      position_key: positionKey,
      role: position.role,
      order: position.order,
    };

    if (existing) {
      await base44.entities.TeamMember.update(existing.id, memberData);
    } else {
      await base44.entities.TeamMember.create(memberData);
    }
    loadData();
    toast.success('Team member saved!');
  };

  const addContactInfo = async () => {
    if (!newContact.title || !newContact.details) {
      toast.error('Please fill in title and details');
      return;
    }
    await base44.entities.ContactInfo.create(newContact);
    setNewContact({ type: 'email', title: '', details: '', description: '', href: '' });
    loadData();
    toast.success('Contact info added!');
  };

  const deleteContactInfo = async (id) => {
    await base44.entities.ContactInfo.delete(id);
    loadData();
    toast.success('Contact info deleted!');
  };

  const handleImageUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    callback(file_url);
    toast.success('Image uploaded!');
  };

  return (
    <div className="bg-slate-900 min-h-screen pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <p className="text-slate-400">Manage your McKay YAF website content</p>
            </div>
          </div>

          <Tabs defaultValue="settings" className="space-y-6">
            <TabsList className="bg-slate-800 border border-slate-700">
              <TabsTrigger value="settings" className="data-[state=active]:bg-red-600">Site Settings</TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-red-600">Events</TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-red-600">Leadership</TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-red-600">Contact Info</TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-red-600">Privacy Policy</TabsTrigger>
            </TabsList>

            {/* Site Settings */}
            <TabsContent value="settings">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-red-500" />
                    Site Settings & Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-slate-300">Active Members</Label>
                      <Input
                        type="number"
                        value={settings.active_members || ''}
                        onChange={(e) => setSettings({ ...settings, active_members: parseInt(e.target.value) || '' })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2"
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Events This Year</Label>
                      <Input
                        type="number"
                        value={settings.events_this_year || ''}
                        onChange={(e) => setSettings({ ...settings, events_this_year: parseInt(e.target.value) || '' })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2"
                        placeholder="12"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Guest Speakers</Label>
                      <Input
                        type="number"
                        value={settings.guest_speakers || ''}
                        onChange={(e) => setSettings({ ...settings, guest_speakers: parseInt(e.target.value) || '' })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2"
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Year Founded</Label>
                      <Input
                        type="number"
                        value={settings.year_founded || ''}
                        onChange={(e) => setSettings({ ...settings, year_founded: parseInt(e.target.value) || '' })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2"
                        placeholder="2023"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-slate-300">Our Mission Text</Label>
                      <Textarea
                        value={settings.mission_text || ''}
                        onChange={(e) => setSettings({ ...settings, mission_text: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2 min-h-[100px]"
                        placeholder="Enter the mission statement..."
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Our Vision Text</Label>
                      <Textarea
                        value={settings.vision_text || ''}
                        onChange={(e) => setSettings({ ...settings, vision_text: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2 min-h-[100px]"
                        placeholder="Enter the vision statement..."
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Our Values Text</Label>
                      <Textarea
                        value={settings.values_text || ''}
                        onChange={(e) => setSettings({ ...settings, values_text: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2 min-h-[100px]"
                        placeholder="Enter the values statement..."
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={saveSettings} 
                    disabled={saving}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Settings'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events */}
            <TabsContent value="events">
              <Card className="bg-slate-800/50 border-slate-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-red-500" />
                    Add New Event
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Title *</Label>
                      <Input
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2"
                        placeholder="Event title"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Date *</Label>
                      <Input
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2"
                        placeholder="January 20, 2025"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Time</Label>
                      <Input
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2"
                        placeholder="6:00 PM - 8:00 PM"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Location</Label>
                      <Input
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2"
                        placeholder="McKay High School, Room 105"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Category</Label>
                      <Select value={newEvent.category} onValueChange={(v) => setNewEvent({ ...newEvent, category: v })}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {['Meeting', 'Workshop', 'Rally', 'Training', 'Summit', 'Social'].map(cat => (
                            <SelectItem key={cat} value={cat} className="text-white">{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Event Image</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={newEvent.image_url}
                          onChange={(e) => setNewEvent({ ...newEvent, image_url: e.target.value })}
                          className="bg-slate-700/50 border-slate-600 text-white"
                          placeholder="Image URL or upload"
                        />
                        <label className="cursor-pointer">
                          <input ref={eventFileInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setNewEvent({ ...newEvent, image_url: url }))} />
                          <Button type="button" variant="outline" className="border-slate-600 text-slate-300" onClick={() => eventFileInputRef.current?.click()}>
                            <Upload className="w-4 h-4" />
                          </Button>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Description</Label>
                    <Textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="bg-slate-700/50 border-slate-600 text-white mt-2"
                      placeholder="Event description..."
                    />
                  </div>
                  <Button onClick={addEvent} className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-red-500" />
                    Current Events ({events.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {events.length === 0 ? (
                    <p className="text-slate-400">No events yet. Add your first event above.</p>
                  ) : (
                    <div className="space-y-3">
                      {events.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                          <div>
                            <h4 className="text-white font-medium">{event.title}</h4>
                            <p className="text-slate-400 text-sm">{event.date} • {event.location}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteEvent(event.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-600/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team - Collapsible Positions */}
            <TabsContent value="team">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-red-500" />
                    Leadership Positions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {LEADERSHIP_POSITIONS.map((position) => {
                    const member = getTeamMemberByPosition(position.key);
                    const isExpanded = expandedPositions[position.key];
                    
                    return (
                      <Collapsible 
                        key={position.key}
                        open={isExpanded}
                        onOpenChange={(open) => setExpandedPositions({ ...expandedPositions, [position.key]: open })}
                      >
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                            <div className="flex items-center gap-4">
                              {member?.image_url && (
                                <img src={member.image_url} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                              )}
                              <div className="text-left">
                                <h4 className="text-white font-medium">{position.role}</h4>
                                <p className="text-slate-400 text-sm">{member?.name || 'Not assigned'}</p>
                              </div>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <PositionEditor 
                            position={position} 
                            member={member} 
                            onSave={(data) => saveTeamMember(position.key, data)}
                            onImageUpload={handleImageUpload}
                          />
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact */}
            <TabsContent value="contact">
              <Card className="bg-slate-800/50 border-slate-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-red-500" />
                    Add Contact Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Type</Label>
                      <Select value={newContact.type} onValueChange={(v) => setNewContact({ ...newContact, type: v })}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="email" className="text-white">Email</SelectItem>
                          <SelectItem value="phone" className="text-white">Phone</SelectItem>
                          <SelectItem value="address" className="text-white">Address</SelectItem>
                          <SelectItem value="hours" className="text-white">Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Title *</Label>
                      <Input
                        value={newContact.title}
                        onChange={(e) => setNewContact({ ...newContact, title: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2"
                        placeholder="Email Us, Call Us, etc."
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Details *</Label>
                      <Input
                        value={newContact.details}
                        onChange={(e) => setNewContact({ ...newContact, details: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2"
                        placeholder="contact@email.com or address"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Description</Label>
                      <Input
                        value={newContact.description}
                        onChange={(e) => setNewContact({ ...newContact, description: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2"
                        placeholder="We respond within 24 hours"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-slate-300">Link URL (optional)</Label>
                      <Input
                        value={newContact.href}
                        onChange={(e) => setNewContact({ ...newContact, href: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white mt-2"
                        placeholder="mailto:email@example.com or tel:+1234567890"
                      />
                    </div>
                  </div>
                  <Button onClick={addContactInfo} className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact Info
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-red-500" />
                    Contact Information ({contactInfo.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {contactInfo.length === 0 ? (
                    <p className="text-slate-400">No contact info yet. Add your first entry above.</p>
                  ) : (
                    <div className="space-y-3">
                      {contactInfo.map((info) => (
                        <div key={info.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                          <div>
                            <h4 className="text-white font-medium">{info.title}</h4>
                            <p className="text-slate-400 text-sm">{info.details} • {info.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteContactInfo(info.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-600/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>


            {/* Privacy Policy */}
            <TabsContent value="privacy">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-500" />
                    Privacy Policy & Disclaimer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Privacy Policy Text</Label>
                    <Textarea
                      value={settings.privacy_policy || ''}
                      onChange={(e) => setSettings({ ...settings, privacy_policy: e.target.value })}
                      className="bg-slate-700/50 border-slate-600 text-white mt-2 min-h-[400px]"
                      placeholder="Enter the privacy policy and disclaimer text..."
                    />
                  </div>
                  <Button 
                    onClick={saveSettings} 
                    disabled={saving}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Privacy Policy'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

export default Admin;

function PositionEditor({ position, member, onSave, onImageUpload }) {
  const fileInputRef = useRef(null);
  const [data, setData] = useState({
    name: member?.name || '',
    bio: member?.bio || '',
    image_url: member?.image_url || '',
    email: member?.email || '',
    linkedin: member?.linkedin || '',
    twitter: member?.twitter || '',
    instagram: member?.instagram || '',
  });

  const handleSave = () => {
    onSave(data);
  };

  return (
    <div className="p-4 bg-slate-700/20 rounded-lg mt-2 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label className="text-slate-300">Name</Label>
          <Input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="bg-slate-700/50 border-slate-600 text-white mt-2"
            placeholder="Full name"
          />
        </div>
        <div>
          <Label className="text-slate-300">Email</Label>
          <Input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="bg-slate-700/50 border-slate-600 text-white mt-2"
            placeholder="email@example.com"
          />
        </div>
        <div>
          <Label className="text-slate-300">Profile Photo</Label>
          <div className="flex gap-2 mt-2">
            <Input
              value={data.image_url}
              onChange={(e) => setData({ ...data, image_url: e.target.value })}
              className="bg-slate-700/50 border-slate-600 text-white"
              placeholder="Image URL or upload"
            />
            <label className="cursor-pointer">
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => onImageUpload(e, (url) => setData({ ...data, image_url: url }))} />
              <Button type="button" variant="outline" className="border-slate-600 text-slate-300" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-4 h-4" />
              </Button>
            </label>
          </div>
        </div>
        <div>
          <Label className="text-slate-300">Instagram URL</Label>
          <Input
            value={data.instagram}
            onChange={(e) => setData({ ...data, instagram: e.target.value })}
            className="bg-slate-700/50 border-slate-600 text-white mt-2"
            placeholder="https://instagram.com/..."
          />
        </div>
        <div>
          <Label className="text-slate-300">Twitter URL</Label>
          <Input
            value={data.twitter}
            onChange={(e) => setData({ ...data, twitter: e.target.value })}
            className="bg-slate-700/50 border-slate-600 text-white mt-2"
            placeholder="https://twitter.com/..."
          />
        </div>
        <div>
          <Label className="text-slate-300">LinkedIn URL</Label>
          <Input
            value={data.linkedin}
            onChange={(e) => setData({ ...data, linkedin: e.target.value })}
            className="bg-slate-700/50 border-slate-600 text-white mt-2"
            placeholder="https://linkedin.com/in/..."
          />
        </div>
      </div>
      <div>
        <Label className="text-slate-300">Bio</Label>
        <Textarea
          value={data.bio}
          onChange={(e) => setData({ ...data, bio: e.target.value })}
          className="bg-slate-700/50 border-slate-600 text-white mt-2"
          placeholder="Short biography..."
        />
      </div>
      <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
        <Save className="w-4 h-4 mr-2" />
        Save {position.role}
      </Button>
    </div>
  );
}
