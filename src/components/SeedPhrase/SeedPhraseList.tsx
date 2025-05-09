import SeedPhraseItem from "@components/SeedPhrase/SeedPhraseItem"

type SeedPhraseListProps = React.HtmlHTMLAttributes<HTMLUListElement> & {
    words: string[]
}

const SeedPhraseList = ({ words, className, ...props }: SeedPhraseListProps) => {
    return (
        <ul className={className} {...props}>
            {
                words.map((word, index) => (
                    <li key={index}>
                        <SeedPhraseItem word={`${index+1}. ${word}`} />
                    </li>
                ))
            }
        </ul>
    )
}

export default SeedPhraseList