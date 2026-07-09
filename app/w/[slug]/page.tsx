import { notFound } from "next/navigation";

import { getWish } from "@/features/wishes/actions/get-wish";
import WishCard from "@/features/wishes/components/wish-card";

type Props = {
    params: Promise<{
        slug: string;
    }>;
}

export default async function WishPage ({
    params,
}:Props){
    const {slug} = await params;

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
      />
    </main>
  );
}