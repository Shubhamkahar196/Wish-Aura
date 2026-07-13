import { notFound } from "next/navigation";

import { getWish } from "@/features/wishes/actions/get-wish";
// import WishCard from "@/features/wishes/components/wish-card";
import WishCard from "@/features/wishes/components/wish-card";
import TemplateRenderer from "@/features/templates/template-render";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WishPage({ params }: Props) {
  const { slug } = await params;

  const wish = await getWish(slug);

  if (!wish) {
    notFound();
  }

  return (
    <main className="container py-20">
      <WishCard
        title={wish.title}
        message={wish.message}
        category={wish.category}
        theme={wish.theme}
        image={wish.images?.[0]?.url}
      />

      <TemplateRenderer
  theme={wish.theme}
  title={wish.title}
  message={wish.message}
  category={wish.category}
  image={wish.image}
/>
    </main>
  );
}
