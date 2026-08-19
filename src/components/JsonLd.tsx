/* Вмъква schema.org обект като JSON-LD script (server компонент). */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // „<" се escape-ва, за да не може съдържание да затвори script тага
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
