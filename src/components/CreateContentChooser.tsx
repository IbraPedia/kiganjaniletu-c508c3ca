import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, FileText, BookOpen } from 'lucide-react';
import CreatePostDialog from '@/components/CreatePostDialog';

interface Props {
  onPostCreated: () => void;
  defaultCategory?: string;
}

const CreateContentChooser = ({ onPostCreated, defaultCategory }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [chooserOpen, setChooserOpen] = useState(false);
  const [showPostDialog, setShowPostDialog] = useState(false);

  const handleFabClick = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setChooserOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleFabClick}
        size="lg"
        className="rounded-full h-14 w-14 shadow-lg gap-0"
        aria-label="Create content"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <Dialog open={chooserOpen} onOpenChange={setChooserOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'var(--font-heading)' }}>What would you like to create?</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 pt-2">
            <button
              onClick={() => { setChooserOpen(false); setShowPostDialog(true); }}
              className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
            >
              <FileText className="h-8 w-8 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-sm">Create a Post</p>
                <p className="text-xs text-muted-foreground">Short update, up to 500 characters with photos</p>
              </div>
            </button>
            <button
              onClick={() => { setChooserOpen(false); navigate('/create-thread'); }}
              className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
            >
              <BookOpen className="h-8 w-8 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-sm">Create a Thread</p>
                <p className="text-xs text-muted-foreground">Long-form article with rich text formatting and images</p>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {showPostDialog && (
        <CreatePostDialog
          onPostCreated={() => { onPostCreated(); setShowPostDialog(false); }}
          defaultCategory={defaultCategory}
          externalOpen={showPostDialog}
          onExternalOpenChange={setShowPostDialog}
        />
      )}
    </>
  );
};

export default CreateContentChooser;
