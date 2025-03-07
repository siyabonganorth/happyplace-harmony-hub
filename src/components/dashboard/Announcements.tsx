
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, BellRing, Plus } from 'lucide-react';
import { Announcement } from '../../types';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AnnouncementsProps {
  announcements: Announcement[];
  canCreate?: boolean;
}

const Announcements: React.FC<AnnouncementsProps> = ({ 
  announcements,
  canCreate = false
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Filter to only show important announcements or the latest 2
  const importantAnnouncements = announcements.filter(a => a.important);
  const regularAnnouncements = announcements.filter(a => !a.important);
  
  const displayAnnouncements = [
    ...importantAnnouncements,
    ...regularAnnouncements
  ].slice(0, 3);

  if (displayAnnouncements.length === 0 && !canCreate) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center">
          <BellRing className="mr-2 h-5 w-5 text-vybe" />
          Announcements
        </h3>
        
        {canCreate && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/announcements/create')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Announcement
          </Button>
        )}
      </div>
      
      {displayAnnouncements.length > 0 ? (
        <div className="grid gap-4">
          {displayAnnouncements.map(announcement => (
            <Card key={announcement.id} className={`overflow-hidden ${announcement.important ? 'border-orange-200 bg-orange-50' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{announcement.title}</h4>
                      {announcement.important && (
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                          Important
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{announcement.content}</p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Posted: {format(new Date(announcement.createdAt), 'MMM d, yyyy')}
                      {announcement.expiresAt && ` · Expires: ${format(new Date(announcement.expiresAt), 'MMM d, yyyy')}`}
                    </div>
                  </div>
                  
                  {announcement.important && (
                    <div className="ml-4 p-2 bg-orange-100 rounded-full">
                      <Info className="h-5 w-5 text-orange-600" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            <p>No active announcements</p>
          </CardContent>
        </Card>
      )}
      
      {announcements.length > 3 && (
        <div className="text-center">
          <Button 
            variant="link" 
            onClick={() => navigate('/announcements')}
            className="text-vybe"
          >
            View all announcements
          </Button>
        </div>
      )}
    </div>
  );
};

export default Announcements;
