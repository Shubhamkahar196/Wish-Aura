import BirthdayClassic from "@/features/templates/birthday/birthday-classic";
import BirthdayElegant from "@/features/templates/birthday/birthday-elegant";
import BirthdayParty from "@/features/templates/birthday/birthday-party";
import BirthdaySimple from "@/features/templates/birthday/birthday-simple";

type WishCardProps = {
  title: string;
  message: string;
  category: string;
  image?: string;
  theme?: string;
};

export default function WishCard(props: WishCardProps) {
  switch (props.theme) {
    case "party":
      return <BirthdayParty {...props} />;

    case "elegant":
      return <BirthdayElegant {...props} />;

      case "simple":
        return <BirthdaySimple {...props}/>;

    default:
      return <BirthdayClassic {...props} />;
  }
}