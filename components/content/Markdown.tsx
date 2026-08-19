import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import styles from './markdown.module.css';

type MarkdownProps = {
  content: string;
  className?: string;
  /** Renders single line breaks as line breaks instead of merging them into one paragraph (for lyrics/poetry). */
  preserveLineBreaks?: boolean;
};

export function Markdown({ content, className = '', preserveLineBreaks = false }: MarkdownProps) {
  const remarkPlugins = preserveLineBreaks ? [remarkGfm, remarkBreaks] : [remarkGfm];

  return (
    <div className={`${styles.markdown} ${className}`.trim()}>
      <ReactMarkdown remarkPlugins={remarkPlugins}>{content}</ReactMarkdown>
    </div>
  );
}
