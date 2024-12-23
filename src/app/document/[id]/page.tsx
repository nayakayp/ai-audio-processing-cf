import DocumentSection from '@/components/DocumentSection';

export const runtime = 'edge'
const DocumentDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return (
    <DocumentSection
      pageId={id}
    />
  )
}

export default DocumentDetail
