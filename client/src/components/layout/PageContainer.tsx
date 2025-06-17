interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="py-8 px-4">
      <div className="container mx-auto">{children}</div>
    </main>
  );
}
