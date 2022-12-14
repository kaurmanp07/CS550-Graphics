#version 120

uniform float   uKa, uKd, uKs;		// coefficients of each type of lighting
uniform vec3  uColor;			// object color
uniform vec3  uSpecularColor;		// light color
uniform float   uShininess;		// specular exponent
uniform float uS0, uT0, uDs, uDt;		

varying  vec2  vST;			// texture coords
varying  vec3  vN;			// normal vector
varying  vec3  vL;			// vector from point to light
varying  vec3  vE;			// vector from point to eye

//varying vec2  	vST;		// texture coords
//uniform vec3 uColor;
//uniform float uS0, uT0;
//uniform float uC, uD;

//const float PI = 	3.14159265;

void
main( )
{

	vec3 Normal = normalize(vN);
	vec3 Light  = normalize(vL);
	vec3 Eye    = normalize(vE);

	vec3 myColor = uColor;
	if(	(uDs + .1) >= vST.t && (uDs - .1) <= vST.t )
	{
			myColor = vec3( .5, 0.8, 0.8 );
	}

	vec3 ambient = uKa * myColor;

	float d = max( dot(Normal,Light), 0. );       // only do diffuse if the light can see the point
	vec3 diffuse = uKd * d * myColor;

	float s = 0.;
	if( dot(Normal,Light) > 0. )	          // only do specular if the light can see the point
	{
		vec3 ref = normalize(  reflect( -Light, Normal )  );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec3 specular = uKs * s * uSpecularColor;
	gl_FragColor = vec4( ambient + diffuse + specular,  .5 );


/*
	float lon = .15;
	vec3 myColor = uColor;
	if( vST.t > (.6+lon*uC) && vST.t < (.8 -lon*uC) || vST.t > (.2+lon*uC) && vST.t < (.4 -lon*uC))
	{
		myColor = vec3( 0.6, 0.8, 0.6 );
	}

	if( vST.s < .1 -.25*uC || vST.s > (.2+.1*uC) && vST.s < (.3 -.1*uC) || vST.s > (.45+.1*uC) && vST.s < (.55 -.1*uC) || vST.s > (.7+.1*uC) && vST.s < (.8 -.1*uC) || vST.s > (.95+.1*uC))
	{
		myColor = vec3( 0.7, 1., 0.1 );
	}


	if( vST.s < .1 -.25*uC || vST.s > (.2+.1*uC) && vST.s < (.3 -.1*uC) || vST.s > (.45+.1*uC) && vST.s < (.55 -.1*uC) || vST.s > (.7+.1*uC) && vST.s < (.8 -.1*uC) || vST.s > (.95+.1*uC)){
		if( vST.t > (.6+lon*uC) && vST.t < (.8 -lon*uC) || vST.t > (.2+lon*uC) && vST.t < (.4 -lon*uC))
		{
			myColor = vec3( 0.7, 0., 0.4 );
		}
	}
	gl_FragColor = vec4( myColor,  0.4 );
	*/
}
