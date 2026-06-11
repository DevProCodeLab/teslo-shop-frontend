interface Props {
    title: string;
    subTitle?: string;
}

export const CustomJumbotron = ({ title, subTitle }: Props) => {
    const defaultSubTitle = 'Tienda de ropa minimalista con los mejores diseños y los mas altos materiales de calidad al mejor precio.'
    return (
        <section className="py-10 px-4 lg:px-8 bg-muted/30">
            <div className="container mx-auto text-center">
                <h1 className="font-montserrat text-4xl lg:text-7xl font-light tracking-tight mb-6">
                    {title}
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {subTitle || defaultSubTitle}
                </p>
            </div>
        </section>
    )
}
