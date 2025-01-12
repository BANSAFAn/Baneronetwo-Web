import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

interface Survey {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  markdownFile: string;
}

const Surveys = () => {
  const [tags] = useState<string[]>(['Gaming', 'Technology', 'Community']);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading] = useState(false);
  const navigate = useNavigate();

  const surveys: Survey[] = [
    {
      id: '1',
      title: 'Gaming Experience Survey',
      description: 'Help us understand your gaming preferences and experiences',
      date: '2024-03-15',
      tags: ['Gaming', 'Community'],
      markdownFile: 'gaming-experience'
    },
    {
      id: '2',
      title: 'Technology Usage Survey',
      description: 'Share your thoughts on current technology trends',
      date: '2024-03-10',
      tags: ['Technology'],
      markdownFile: 'tech-usage'
    }
  ];

  const filteredSurveys = selectedTag
    ? surveys.filter(survey => survey.tags.includes(selectedTag))
    : surveys;

  const handleSurveyClick = (markdownFile: string) => {
    navigate(`/survey/${markdownFile}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Topics</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary/80"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredSurveys.map((survey) => (
          <Card 
            key={survey.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleSurveyClick(survey.markdownFile)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{survey.title}</CardTitle>
                  <CardDescription>{survey.description}</CardDescription>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(survey.date).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {survey.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {filteredSurveys.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No surveys found {selectedTag ? `for topic "${selectedTag}"` : ''}
        </div>
      )}
    </div>
  );
};

export default Surveys;