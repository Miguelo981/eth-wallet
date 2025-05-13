import { Badge } from "@components/ui/badge"

type SeedPhraseItemProps = {
    word: string
}

const SeedPhraseItem = ({ word }: SeedPhraseItemProps) => {
    return (
        <Badge className="bg-blue-500 text-base rounded-full">{word}</Badge>
    )
}

export default SeedPhraseItem