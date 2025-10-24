export function Label(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) {

    return (
        <p {...props}>
            {props.children}
        </p>
    )
}