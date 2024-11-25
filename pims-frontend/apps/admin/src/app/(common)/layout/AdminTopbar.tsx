export type TopbarProps = {}

export function AdminTopbar(props: React.PropsWithChildren<TopbarProps>) {
  return (
    <header className="w-full p-4 border-b border-b-border-normal">
      {props.children}
    </header>
  )
}
