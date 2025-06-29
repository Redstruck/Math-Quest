import React, { useCallback, useEffect, useRef } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, Engine } from '@tsparticles/engine';

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger, onComplete }) => {
  const containerRef = useRef<Container | undefined>();

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log('🎉 Initializing particles engine...');
    try {
      await loadSlim(engine);
      console.log('✅ Particles engine loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load particles engine:', error);
    }
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log('🎊 Particles container loaded:', !!container);
    containerRef.current = container;
    
    if (container && trigger) {
      console.log('🚀 Starting confetti animation...');
      try {
        // Force refresh and start
        await container.refresh();
        container.play();
        console.log('✨ Confetti animation started successfully');
      } catch (error) {
        console.error('❌ Failed to start confetti:', error);
      }
    }
  }, [trigger]);

  useEffect(() => {
    if (trigger) {
      console.log('⏰ Confetti trigger activated');
      
      // Set completion timer
      const timer = setTimeout(() => {
        console.log('🏁 Confetti animation complete');
        if (onComplete) {
          onComplete();
        }
      }, 3000);

      return () => {
        console.log('🧹 Cleaning up confetti timer');
        clearTimeout(timer);
      };
    }
  }, [trigger, onComplete]);

  if (!trigger) {
    return null;
  }

  console.log('🎨 Rendering confetti particles component...');

  return (
    <div 
      className="fixed inset-0 pointer-events-none" 
      style={{ 
        zIndex: 10000,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      }}
    >
      <Particles
        id="confetti-celebration"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: {
            enable: false,
            zIndex: 10000
          },
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
              value: 0,
              density: {
                enable: false
              }
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
                "#FF4500", // Red orange
                "#9966CC", // Amethyst
                "#50C878"  // Emerald
              ]
            },
            shape: {
              type: ["circle", "square"],
              options: {
                circle: {
                  radius: 1
                },
                square: {
                  width: 1,
                  height: 1
                }
              }
            },
            opacity: {
              value: {
                min: 0.6,
                max: 1
              },
              animation: {
                enable: true,
                speed: 3,
                startValue: "max",
                destroy: "min"
              }
            },
            size: {
              value: {
                min: 6,
                max: 16
              },
              animation: {
                enable: false
              }
            },
            links: {
              enable: false
            },
            life: {
              duration: {
                sync: true,
                value: 6
              },
              count: 1
            },
            move: {
              enable: true,
              gravity: {
                enable: true,
                acceleration: 15,
                maxSpeed: 50
              },
              speed: {
                min: 15,
                max: 30
              },
              decay: 0.02,
              direction: "none",
              straight: false,
              outModes: {
                default: "destroy",
                top: "none",
                bottom: "destroy",
                left: "destroy",
                right: "destroy"
              },
              random: true,
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
                speed: 50
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
                speed: 50
              }
            },
            roll: {
              darken: {
                enable: true,
                value: 30
              },
              enable: true,
              speed: {
                min: 10,
                max: 20
              }
            },
            wobble: {
              distance: 25,
              enable: true,
              move: true,
              speed: {
                min: -10,
                max: 10
              }
            }
          },
          detectRetina: true,
          emitters: [
            // Center main burst
            {
              position: {
                x: 50,
                y: 30
              },
              life: {
                count: 0,
                duration: 0.2,
                delay: 0
              },
              rate: {
                delay: 0.01,
                quantity: 120
              },
              size: {
                width: 20,
                height: 20
              }
            },
            // Left side burst
            {
              position: {
                x: 35,
                y: 35
              },
              life: {
                count: 0,
                duration: 0.15,
                delay: 0.1
              },
              rate: {
                delay: 0.02,
                quantity: 80
              },
              size: {
                width: 15,
                height: 15
              }
            },
            // Right side burst
            {
              position: {
                x: 65,
                y: 35
              },
              life: {
                count: 0,
                duration: 0.15,
                delay: 0.15
              },
              rate: {
                delay: 0.02,
                quantity: 80
              },
              size: {
                width: 15,
                height: 15
              }
            },
            // Secondary center burst for more density
            {
              position: {
                x: 50,
                y: 40
              },
              life: {
                count: 0,
                duration: 0.1,
                delay: 0.3
              },
              rate: {
                delay: 0.03,
                quantity: 60
              },
              size: {
                width: 10,
                height: 10
              }
            }
          ]
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10000
        }}
      />
    </div>
  );
};

export default ConfettiEffect;