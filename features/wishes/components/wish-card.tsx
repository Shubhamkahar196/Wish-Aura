type WishCardProps = {
    title: string;
    message: string;
    category: string;
}






export default function WishCard({
    title,
    message,
    category,
}:WishCardProps) {
    return (
        <div className="mx-auto max-w-3xl rounded-xl border p-8 shadow-lg">
      <span className="text-sm text-muted-foreground">
        {category}
      </span>

      <h1 className="mt-3 text-4xl font-bold">
        {title}
      </h1>

      <p className="mt-6 whitespace-pre-wrap leading-8">
        {message}
      </p>
    </div>
    )
}