import { Badge } from "@components/ui/badge"

type SeedPhraseItemProps = {
    word: string
}

const SeedPhraseItem = ({ word }: SeedPhraseItemProps) => {
    return (
        <Badge className="bg-violet-500 text-lg rounded-full">{word}</Badge>
    )
}

export default SeedPhraseItem