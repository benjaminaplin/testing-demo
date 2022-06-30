import NewtonsCradle from "@uiball/loaders/dist/components/NewtonsCradle"

export const Loader = () => {
    return (
      <div style={{
        width: '100%',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* ...waiting */}
        
              <NewtonsCradle 
                size={55}
                speed={1.4} 
                color="papayawhip"
                />
      </div>
    )
  }