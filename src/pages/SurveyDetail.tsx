import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card } from '@/components/ui/card';

const SurveyDetail = () => {
  const { markdownFile } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await import(`../content/surveys/${markdownFile}.md`);
        setContent(response.default);
      } catch (error) {
        console.error('Error loading survey content:', error);
        setContent('# Survey Not Found\n\nThe requested survey could not be found.');
      }
    };

    fetchContent();
  }, [markdownFile]);

  return (
    <div className="container mx-auto px-4 pt-24">
      <Card className="p-8">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </Card>
    </div>
  );
};

export default SurveyDetail;