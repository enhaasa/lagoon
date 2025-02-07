import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Text from './Text/Text';

// Types
import { Document, BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

interface IRichTextRenderer {
  richTextDocument: Document;
}

export default function RichTextRenderer({ richTextDocument }: IRichTextRenderer) {
  const { assets } = useContext(CMSContext);

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = assets[node.data?.target?.sys?.id] ?? {};
        
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src={asset?.file?.url} 
              style={{ maxWidth: '100%', height: 'auto' }} 
            />
          </div>
        );
      },
      
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => {
        return (
          <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      },
    },
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
    },
  };

  return <Text>{documentToReactComponents(richTextDocument, options)}</Text>;
}
