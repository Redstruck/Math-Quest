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
    if (trigger && containerRef.current) {
      console.log('⚡ Triggering confetti burst...');
      try {
        containerRef.current.refresh();
        containerRef.current.play();
      } catch (error) {
        console.error('❌ Failed to trigger confetti:', error);
      }
    }

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
                "#50C878", // Emerald
                "#FF69B4", // Hot pink
                "#00FF7F", // Spring green
                "#FF8C00", // Dark orange
                "#DA70D6", // Orchid
                "#20B2AA", // Light sea green
                "#FF6347"  // Tomato
              ]
            },
            shape: {
              type: ["circle", "square", "triangle"],
              options: {
                circle: {
                  radius: 1
                },
                square: {
                  width: 1,
                  height: 1
                },
                triangle: {
                  sides: 3
                }
              }
            },
            opacity: {
              value: {
                min: 0.7,
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
                min: 8,
                max: 20
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
                value: 5
              },
              count: 1
            },
            move: {
              enable: true,
              gravity: {
                enable: true,
                acceleration: 12,
                maxSpeed: 40
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
            // Center main burst
            {
              position: {
                x: 50,
                y: 25
              },
              life: {
                count: 0,
                duration: 0.3,
                delay: 0
              },
              rate: {
                delay: 0.01,
                quantity: 150
              },
              size: {
                width: 30,
                height: 30
              }
            },
            // Left side burst
            {
              position: {
                x: 30,
                y: 30
              },
              life: {
                count: 0,
                duration: 0.2,
                delay: 0.1
              },
              rate: {
                delay: 0.02,
                quantity: 100
              },
              size: {
                width: 20,
                height: 20
              }
            },
            // Right side burst
            {
              position: {
                x: 70,
                y: 30
              },
              life: {
                count: 0,
                duration: 0.2,
                delay: 0.15
              },
              rate: {
                delay: 0.02,
                quantity: 100
              },
              size: {
                width: 20,
                height: 20
              }
            },
            // Secondary center burst for more density
            {
              position: {
                x: 50,
                y: 35
              },
              life: {
                count: 0,
                duration: 0.15,
                delay: 0.3
              },
              rate: {
                delay: 0.03,
                quantity: 80
              },
              size: {
                width: 15,
                height: 15
              }
            },
            // Top cascade
            {
              position: {
                x: 50,
                y: 15
              },
              life: {
                count: 0,
                duration: 0.1,
                delay: 0.5
              },
              rate: {
                delay: 0.05,
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