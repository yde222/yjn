const palette = [
  { value: '#FFC53D', name: 'amber' },
  { value: '#F76B15', name: 'orange' },
  { value: '#E93D82', name: 'crimson' },
  { value: '#83CDC1', name: 'teal' },
  { value: '#654DC4', name: 'violet' },
  { value: '#BDEE63', name: 'lime' },
  { value: '#8EC8F6', name: 'blue' },
  { value: '#4E4E49', name: 'black' },
  { value: '#DAD9D6', name: 'gray' },
]

const Palette = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {palette.map(item => (
        <div
          key={item.name}
          style={{
            backgroundColor: item.color,
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default Palette
