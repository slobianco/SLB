import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './markdown.module.css';

type MarkdownProps = {
  content: string;
  className?: string;
};

export function Markdown({ content, className = '' }: MarkdownProps) {
  return (
    <div className={`${styles.markdown} ${className}`.trim()}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
