import React, { useCallback, useEffect } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, Engine } from '@tsparticles/engine';

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger, onComplete }) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log('Initializing particles engine...');
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log('Particles loaded:', !!container);
    if (container && trigger) {
      console.log('Triggering confetti burst!');
      // Start the emitters
      container.play();
    }
  }, [trigger]);

  useEffect(() => {
    if (trigger && onComplete) {
      console.log('Setting completion timer...');
      const timer = setTimeout(() => {
        console.log('Confetti animation complete');
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!trigger) {
    console.log('Confetti not triggered, returning null');
    return null;
  }

  console.log('Rendering confetti particles...');

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      <Particles
        id="confetti-particles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent"
            }
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false
              },
              onHover: {
                enable: false
              },
              resize: true
            }
          },
          particles: {
            number: {
              value: 0
            },
            color: {
              value: [
                "#FFD700", // Gold
                "#FF6B35", // Orange-red  
                "#F7931E", // Orange
                "#00FFFC", // Cyan
                "#FC00FF", // Magenta
                "#32CD32", // Lime green
                "#FF1493", // Deep pink
                "#00BFFF", // Deep sky blue
                "#FFFF00", // Yellow
                "#FF4500"  // Red orange
              ]
            },
            shape: {
              type: ["circle", "square", "triangle"]
            },
            opacity: {
              value: {
                min: 0.3,
                max: 1
              },
              animation: {
                enable: true,
                speed: 2,
                startValue: "max",
                destroy: "min"
              }
            },
            size: {
              value: {
                min: 4,
                max: 12
              }
            },
            links: {
              enable: false
            },
            life: {
              duration: {
                sync: true,
                value: 5
              },
              count: 1
            },
            move: {
              enable: true,
              gravity: {
                enable: true,
                acceleration: 20
              },
              speed: {
                min: 20,
                max: 35
              },
              decay: 0.05,
              direction: "none",
              straight: false,
              outModes: {
                default: "destroy",
                top: "none"
              },
              random: false,
              size: false,
              trail: {
                enable: false
              }
            },
            rotate: {
              value: {
                min: 0,
                max: 360
              },
              direction: "random",
              move: true,
              animation: {
                enable: true,
                speed: 60
              }
            },
            tilt: {
              direction: "random",
              enable: true,
              move: true,
              value: {
                min: 0,
                max: 360
              },
              animation: {
                enable: true,
                speed: 60
              }
            },
            roll: {
              darken: {
                enable: true,
                value: 25
              },
              enable: true,
              speed: {
                min: 15,
                max: 25
              }
            },
            wobble: {
              distance: 30,
              enable: true,
              move: true,
              speed: {
                min: -15,
                max: 15
              }
            }
          },
          detectRetina: true,
          emitters: [
            // Left burst - positioned more centrally
            {
              position: {
                x: 30,
                y: 40
              },
              life: {
                count: 0,
                duration: 0.1,
                delay: 0.1
              },
              rate: {
                delay: 0.05,
                quantity: 60
              },
              size: {
                width: 5,
                height: 5
              }
            },
            // Right burst - positioned more centrally  
            {
              position: {
                x: 70,
                y: 40
              },
              life: {
                count: 0,
                duration: 0.1,
                delay: 0.15
              },
              rate: {
                delay: 0.05,
                quantity: 60
              },
              size: {
                width: 5,
                height: 5
              }
            },
            // Center burst - main explosion
            {
              position: {
                x: 50,
                y: 35
              },
              life: {
                count: 0,
                duration: 0.15,
                delay: 0.2
              },
              rate: {
                delay: 0.03,
                quantity: 100
              },
              size: {
                width: 10,
                height: 10
              }
            },
            // Additional center burst for more particles
            {
              position: {
                x: 50,
                y: 45
              },
              life: {
                count: 0,
                duration: 0.1,
                delay: 0.3
              },
              rate: {
                delay: 0.05,
                quantity: 80
              },
              size: {
                width: 8,
                height: 8
              }
            }
          ]
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default ConfettiEffect;