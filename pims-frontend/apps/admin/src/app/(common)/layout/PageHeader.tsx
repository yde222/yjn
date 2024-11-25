export type PageHeaderProps = {
  name: string
  desc?: string
}

export const PageHeader = (props: React.PropsWithChildren<PageHeaderProps>) => {
  return (
    <div className="flex gap-4 justify-between">
      <div>
        <h3 className="text-2xl font-semibold">{props.name}</h3>
        <p className="text-text-assistive-1 font-normal">{props?.desc}</p>
      </div>
      <>{props.children}</>
    </div>
  )
}
